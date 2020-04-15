import { Controller, Get, Param, Req, Inject, forwardRef } from '@nestjs/common';
import { CinemaService } from '~/cinema/cinema.service';
import BaseController from '~/common/BaseController';
import { CinemaModel } from '~/cinema/cinema.model';
import { HallModel } from '~/hall/hall.model';
import { HallCellModel } from '~/hallCell/hallCell.model';
import { ShopModel } from '~/shop/shop.model';
import { HallService } from '~/hall/hall.service';
import { HallCellService } from '~/hallCell/hallCell.service';

@Controller('/client/api/v1/general')
export class ClientGeneralController extends BaseController {
  constructor(
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
    @Inject(forwardRef(() => CinemaService)) private shopService: CinemaService,
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
    return this.wrapSuccess({
      cinemas,
      halls,
      hallCells,
      shops
    });
  }
}

