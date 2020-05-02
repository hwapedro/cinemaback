import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';
import { CreateManyShowtimesValidator } from './validators';
import { FilmService } from '~/film/film.service';
import { HallService } from '~/hall/hall.service';
import { TIME_BETWEEN_SHOWTIMES } from './constants';
import moment from 'moment';
import log from 'color-log';
import { CinemaService } from '~/cinema/cinema.service';

@Controller('api/v1/showtimes')
@ApiTags('auth')
export class ShowtimeController extends BaseController {
  constructor(
    private readonly showtimeService: ShowtimeService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const showtime = await this.showtimeService.findById(id)
      .lean()
      .populate('film')
      .populate('hall')
      .exec();
    return this.wrapSuccess({
      showtime,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.showtimeService.find(query.conditions)
      .populate('film')
      .populate('hall')
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.showtimeService.find(query.conditions)
      .sort({
        time: -1
      })
      .countDocuments()
      .exec();
    const showtimes = await findQuery.exec();
    return this.wrapSuccess({
      showtimes,
      hasMore: ((query.skip || 0) + (query.limit || 1)) < count,
      total: count,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    const showtime = body;
    const { film: filmId, hall: hallId, cinema: cinemaId } = showtime;
    const film = await this.filmService.findById(filmId).lean().exec();
    if (!film) {
      throw new BadRequestException('Film not found');
      return this.wrapFail({
        status: 'invalid-film'
      });
    }
    const hall = await this.hallService.findById(hallId).lean().exec();
    if (!hall) {
      throw new BadRequestException('Hall not found');
      return this.wrapFail({
        status: 'invalid-hall'
      });
    }
    const cinema = await this.cinemaService.findById(cinemaId).lean().exec();
    if (!cinema) {
      throw new BadRequestException('Cinema not found');
      return this.wrapFail({
        status: 'invalid-cinema'
      });
    }

    const tbs = TIME_BETWEEN_SHOWTIMES;
    // there should NOT be any showtimes in between
    // S - TBS and S + film.duration + TBS
    const projectInfo = {
      _id: 1,
      film: 1,
      hall: 1,
      time: 1
    };

    const startTime = moment(showtime.time).subtract(tbs, 'minutes');
    const endTime = moment(showtime.time).add(film.duration, 'minutes').add(tbs, 'minutes');
    const pipelines = [
      {
        $match: {
          hall: hall._id,
          cinema: cinema._id,
        },
      },
      {
        $lookup: {
          from: 'films',
          localField: 'film',
          foreignField: '_id',
          as: 'film'
        }
      },
      {
        $unwind: {
          path: '$film',
        }
      },
      {
        $project: {
          showtimeEndTime: {
            $add: ['$time', {
              $multiply: [
                '$film.duration',
                1000 * 60
              ]
            }]
          },
          ...projectInfo
        }
      },
      {
        $project: {
          ...projectInfo,
          showtimeEndTime: 1,
          showtimeEnds: {
            $cond: {
              if: {
                $and: [
                  { $gt: ['$showtimeEndTime', startTime.toDate()] },
                  { $lt: ['$showtimeEndTime', endTime.toDate()] }
                ]
              },
              then: true,
              else: false,
            }
          },
          showtimeStarts: {
            $cond: {
              if: {
                $and: [
                  { $gte: ['$time', startTime.toDate()] },
                  { $lte: ['$time', endTime.toDate()] }
                ]
              },
              then: true,
              else: false,
            }
          }
        }
      },
      {
        $match: {
          $or: [
            { showtimeEnds: true },
            { showtimeStarts: true },
            // {
            //   time: {
            //     $gte: startTime.toDate(),
            //     $lte: endTime.toDate(),
            //   }
            // }
          ]
        }
      }
    ];
    log.mark(pipelines);
    const badShowtimes = await this.showtimeService.raw().aggregate(pipelines).exec();

    // log.mark('agg', badShowtimes);

    badShowtimes.forEach(bs => {
      bs.film = film._id;
    });

    if (badShowtimes.length) {
      throw new BadRequestException('Time overlap found, please select another time. Bad showtimes: '
        + badShowtimes.map(bs => bs.time).join(', '));
      return this.wrapFail({
        status: 'overlap',
        showtime,
        badShowtimes,
      });
    }

    // create showtime, all good 
    const showtimeEntity = await this.showtimeService.create(body);
    await showtimeEntity
      .populate('film')
      .populate('hall')
      .execPopulate();
    return this.wrapSuccess({
      showtime: showtimeEntity
    });
  }

  @Post('/many')
  @UseGuards(AuthGuard('jwt'))
  async createMany(
    @Body() body: CreateManyShowtimesValidator,
    @Req() req,
  ) {

  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.showtimeService.raw()
      .findByIdAndUpdate(id, body, { new: true })
      .populate('film')
      .populate('hall')
      .lean()
      .exec();
    return this.wrapSuccess({
      showtime: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    const showtime = await this.showtimeService.findById(id).exec();
    if (showtime) {
      await showtime.remove();
    }
    return this.wrapSuccess();
  }
}

