import { Controller, Get, Param, Req, Inject, forwardRef } from '@nestjs/common';
import { CinemaService } from '~/cinema/cinema.service';
import BaseController from '~/common/BaseController';
import { CinemaModel } from '~/cinema/cinema.model';
import { HallModel } from '~/hall/hall.model';
import { HallCellModel } from '~/hallCell/hallCell.model';
import { ShopModel } from '~/shop/shop.model';
import { HallService } from '~/hall/hall.service';
import { HallCellService } from '~/hallCell/hallCell.service';
import { GenreService } from '~/genre/genre.service';
import { AgeRuleService } from '~/ageRule/ageRule.service';
import { oidToString } from '~/common/scripts/oidToString';
import { Genre } from '~/genre/genre.model';
import { FilmService } from '~/film/film.service';

@Controller('/client/api/v1/general')
export class ClientGeneralController extends BaseController {
  constructor(
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
    @Inject(forwardRef(() => CinemaService)) private shopService: CinemaService,
    @Inject(forwardRef(() => GenreService)) private genreService: GenreService,
    @Inject(forwardRef(() => AgeRuleService)) private ageRuleService: AgeRuleService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    ) {
    super();
  }

  @Get('/all')
  async getALl(
    @Req() req,
  ) {
    const cinemas = await this.cinemaService.find({})
      .lean()
      .exec();
    const halls = await this.hallService.find({})
      .lean()
      .exec();
    const hallCells = await this.hallCellService.find({})
      .lean()
      .exec();
    const shops = await this.shopService.find({})
      .lean()
      .exec();
    const genres = await this.genreService.find({}).lean().exec();
    const ageRules = await this.ageRuleService.find({}).lean().exec();
    return this.wrapSuccess({
      cinemas,
      halls,
      hallCells,
      shops,
      genres,
      ageRules,
    });
  }

  @Get('/film/:id')
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const film = await this.filmService.findById(id)
      .lean()
      .populate('actors')
      .populate('genres')
      .populate('ageRule')
      .populate('news')
      .exec();
    return this.wrapSuccess({
      film,
    });
  }
}

