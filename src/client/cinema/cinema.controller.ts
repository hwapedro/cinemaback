import { Controller, Get, Param, Req, Inject, forwardRef } from '@nestjs/common';
import { CinemaService } from '~/cinema/cinema.service';
import BaseController from '~/common/BaseController';

@Controller('/client/api/v1/cinemas')
export class ClientCinemaController extends BaseController {
  constructor(
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
  ) {
    super();
  }

  @Get('/all')
  async getALl(
    @Req() req,
  ) {
    const cinemas = await this.cinemaService.find({})
      .lean()
      .populate('halls')
      .populate('shops')
      .populate('films')
      .exec();
    return this.wrapSuccess({
      cinemas,
    });
  }
}

