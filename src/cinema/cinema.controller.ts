import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/cinemas')
@ApiTags('auth')
export class CinemaController extends BaseController {
  constructor(
    private readonly cinemaService: CinemaService,
  ) {
    super();
  }

  @Post('/client/query')
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

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const cinema = await this.cinemaService.findById(id)
      .lean()
      .exec();
    return this.wrapSuccess({
      cinema,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.cinemaService.find(query.conditions)
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

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    const cinema = await this.cinemaService.create(body);
    return this.wrapSuccess({
      cinema
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.cinemaService.raw()
      .findByIdAndUpdate(id, body, { new: true })
      .lean()
      .exec();
    return this.wrapSuccess({
      cinema: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    await this.cinemaService.raw()
      .findByIdAndDelete(id);
    return this.wrapSuccess();
  }
}

