import { Controller, Get, Param, Req, Post, Body, Put, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import BaseController from '../common/BaseController';
import { QueryValidator } from '~/common/validators';

@Controller('client/api/v1/cinemas')
export class CinemaClientController extends BaseController {
  constructor(
    private readonly cinemaService: CinemaService,
  ) {
    super();
  }

  @Post('/query')
  async getClient(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.cinemaService.find(query.conditions)
      .populate('halls')
      .populate('shops')
      .populate('shops')
      .populate('films')
      .populate('showtimes')
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const cinemas = await findQuery.exec();
    return this.wrapSuccess({
      cinemas,
    });
  }
}

