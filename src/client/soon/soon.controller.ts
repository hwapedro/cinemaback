import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Query, Inject, forwardRef, ParseIntPipe } from '@nestjs/common';
import BaseController from '~/common/BaseController';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import log from 'color-log';
import { QueryValidator } from '~/common/validators';
import { ShowtimeService } from '~/showtime/showtime.service';
import { ShowtimeModel, Showtime } from '~/showtime/showtime.model';
import { FilmService } from '~/film/film.service';
import { HallService } from '~/hall/hall.service';
import { HallCellService } from '~/hallCell/hallCell.service';
import { ObjectId, OId, ModelMap } from '~/types';
import { oidToString } from '~/common/scripts/oidToString';
import { Film } from '~/film/film.model';
import { Hall } from '~/hall/hall.model';
import { HallCell } from '~/hallCell/hallCell.model';
import _ from 'lodash';
import { mongoose } from '@typegoose/typegoose';
import { GenreService } from '~/genre/genre.service';
import { AgeRuleService } from '~/ageRule/ageRule.service';
import { Genre } from '~/genre/genre.model';
import { SoonQueryValidator } from './validators';
import { AgeRule } from '~/ageRule/ageRule.model';
import { Actor } from '~/actor/actor.model';


type SoonAggregation = { _id: string, monthDate: any, films: Film[], ageRules: AgeRule[], actors: Actor[], genres: Genre[] };

const MULTISELECT_FIELDS = ['ageRules', 'genres', 'actors'];
const LOOKUP_FIELDS = MULTISELECT_FIELDS.map(field => ({
  $lookup: {
    from: field,
    localField: field,
    foreignField: '_id',
    as: field
  }
}));
const PROJECT_FIELDS_ARR_TO_OBJ = [
  {
    $project: {
      ...MULTISELECT_FIELDS.map(field => ({
        [field]: {
          $arrayToObject: {
            $map: {
              input: `$${field}`,
              as: 'el',
              in: {
                k: '$$el._id',
                v: '$$el'
              }
            }
          }
        }
      })),
    }
  }];

@Controller('client/api/v1/soon')
@ApiTags('client/soon')
export class SoonController extends BaseController {
  constructor(
    @Inject(forwardRef(() => ShowtimeService)) private showtimeService: ShowtimeService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
    @Inject(forwardRef(() => GenreService)) private genreService: GenreService,
    @Inject(forwardRef(() => AgeRuleService)) private ageRuleService: AgeRuleService,
  ) {
    super();
  }

  @Get('/')
  async getCalendar(
    // @Query() soonQuery: SoonQueryValidator,
    @Req() req,
  ) {
    // get films that will come in nearest future (this month + 4 months ahead)
    const now = moment.utc();
    const filmsByMonth = await this.filmService.raw().aggregate<SoonAggregation>([
      {
        $match: {
          distributionStartDate: {
            $gte: now.startOf('month').toDate(),
            $lte: now.add(4, 'months').toDate(),
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$distributionStartDate' } },
          ageRules: { $addToSet: '$ageRule' },
          actors: { $push: '$actors' },
          genres: { $push: '$genres' },
          films: { $addToSet: '$$ROOT' },
        }
      },
      // flatten actors and genres
      {
        $project: {
          _id: 1,
          films: 1,
          ageRules: 1,
          actors: {
            $reduce: {
              input: "$actors",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          },
          genres: {
            $reduce: {
              input: "$genres",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          },
        }
      },
      ...LOOKUP_FIELDS,
      // ...PROJECT_FIELDS_ARR_TO_OBJ,
      // sort
      {
        $sort: {
          'films.distributionStartDate': -1,
        }
      }
    ]);

    log.mark(filmsByMonth);


    // transfrom array to map
    const soonTable: any = {};
    const sortedMonths = [];

    for (const month of filmsByMonth) {
      // create maps instead of arrays
      month.ageRules = Object.fromEntries(month.ageRules.map(ageRule => [
        oidToString(ageRule._id),
        ageRule
      ]));
      month.genres = Object.fromEntries(month.genres.map(genre => [
        oidToString(genre._id),
        genre
      ]));
      month.actors = Object.fromEntries(month.actors.map(actor => [
        oidToString(actor._id),
        actor
      ]));
      for (const film of month.films) {
        film.genres = film.genres.map(genre => month.genres[genre as any]);
        film.ageRule = month.ageRules[film.ageRule as any];
        film.actors = film.actors.map(actor => month.actors[actor as any]);
      }
      soonTable[month._id] = month.films;
    }

    return this.wrapSuccess({
      soon: soonTable,
    });
  }
}

