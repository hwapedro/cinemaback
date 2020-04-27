import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Query, Inject, forwardRef } from '@nestjs/common';
import BaseController from '~/common/BaseController';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import log from 'color-log';
import { QueryValidator } from '~/common/validators';
import { ScheduleService } from './schedule.service';
import { ShowtimeService } from '~/showtime/showtime.service';
import { ShowtimeModel, Showtime } from '~/showtime/showtime.model';
import { ShowtimeQueryValidator, GetShowtimeValidator } from './validators';
import { FilmService } from '~/film/film.service';
import { HallService } from '~/hall/hall.service';
import { HallCellService } from '~/hallCell/hallCell.service';
import { ObjectId, OId } from '~/types';
import { oidToString } from '~/common/scripts/oidToString';
import { Film } from '~/film/film.model';
import { Hall } from '~/hall/hall.model';
import { HallCell } from '~/hallCell/hallCell.model';
import _ from 'lodash';
import { mongoose } from '@typegoose/typegoose';

type ShowtimeAggregation = { _id: string, showtimes: Showtime[], films: ObjectId[], halls: ObjectId[] }[];

@Controller('client/api/v1/schedule')
@ApiTags('client/schedule')
export class ScheduleController extends BaseController {
  constructor(
    @Inject(forwardRef(() => ScheduleService)) private scheduleService: ScheduleService,
    @Inject(forwardRef(() => ShowtimeService)) private showtimeService: ShowtimeService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
  ) {
    super();
  }

  @Get('/calendar')
  async getCalendar(
    @Query('cinema') cinemaId: string,
    @Req() req,
  ) {
    // find all dates that have at least one showtime
    const showtimesByDate: { _id: string, count: number }[] = await this.showtimeService.raw()
      .aggregate([
        { $match: { time: { $gte: moment.utc().startOf('day').toDate() } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$time' } }, count: { $sum: 1 } } },
      ])
      .exec();
    // log.mark(showtimesByDate);
    return this.wrapSuccess({
      dates: showtimesByDate
        .filter(d => d.count)
        .map(d => d._id)
    });
  }

  @Get('/showtime/:id')
  async getShowtimeById(
    @Param() params: GetShowtimeValidator,
  ) {
    const showtime = await this.showtimeService.findById(params.id);
    if (!showtime) {
      return this.wrapError('No showtime');
    }
    const film = await this.filmService.findById(oidToString(showtime.film))
      .lean<Film>()
      .exec();

    const hall = await this.hallService.findById(oidToString(showtime.hall)).lean<Hall>().exec();
    const hallCells = await this.hallService.getCells(hall);

    return this.wrapSuccess({
      showtime,
      film,
      hall,
      hallCells,
    });
  }

  @Get('/showtime')
  async getShowtimes(
    @Query() showtimeQuery: ShowtimeQueryValidator
  ) {
    log.mark('query is', showtimeQuery);
    const { cinema: cinemaId } = showtimeQuery;

    const from = moment.utc(showtimeQuery.from).startOf('day');
    const showtimesByDate: ShowtimeAggregation = await this.showtimeService.raw()
      .aggregate([
        {
          $match: {
            cinema: OId(cinemaId),
            time: {
              $gte: from.toDate(),
              $lte: from.add(7, 'days').toDate(),
            }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$time' } },
            showtimes: { $addToSet: '$$ROOT' },
            films: { $addToSet: '$film' },
            halls: { $addToSet: '$hall' }
          }
        },
      ])
      .exec();
    log.mark(showtimesByDate);

    // films
    const filmsRaw = await this.filmService.find({
      _id: { $in: showtimesByDate.flatMap(entry => entry.films).map(oidToString) }
    }).lean<Film>().exec();
    const films = Object.fromEntries(filmsRaw.map(film => [
      film._id,
      this.filmService.wrap(film),
    ]));

    // shwtimes
    const showtimesList = showtimesByDate.map(entry => {
      // group for each film
      const showtimes: { [key: string]: { [hallId: string]: any[] } } = {};
      entry.showtimes.forEach(showtime => {
        const filmId: string = (showtime.film as any)._id.toString();
        const hallId =  oidToString(showtime.hall);
        showtimes[filmId] = showtimes[filmId] || {};
        showtimes[filmId][hallId] = showtimes[filmId][hallId] || []; 
        // group by hall id
        showtimes[filmId][hallId].push({
          _id: oidToString(showtime._id),
          time: showtime.time.getTime(),
          hall: hallId,
          taken: showtime.taken || [],
        });
      })
      return {
        date: entry._id,
        showtimes,
      };
    });

    const cellIndices: Set<number> = new Set();
    // halls
    const hallsRaw = await this.hallService.find({
      _id: { $in: showtimesByDate.flatMap(entry => entry.halls).map(oidToString) }
    }).lean<Hall>().exec();
    const halls = Object.fromEntries(hallsRaw.map(hall => {
      const hallWrap: any = hall;
      hallWrap.cells = Array.from((new Set(hall.structure.flatMap(s => s))).values());
      hallWrap.cells.forEach(c => cellIndices.add(c));
      return [
        hall._id,
        hallWrap,
      ];
    }));

    // hall cells
    const hallCellsRaw = await this.hallCellService.find({
      index: { $in: Array.from(cellIndices) }
    }).lean<HallCell>().exec();
    const hallCells = Object.fromEntries(hallCellsRaw.map(hallCell => [
      hallCell.index,
      _.omit(hallCell, '_id'),
    ]));

    return this.wrapSuccess({
      showtimes: showtimesList,
      films,
      halls,
      hallCells,
    });
  }
}

