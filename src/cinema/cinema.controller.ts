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

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const cinema = await this.cinemaService.findById(id)
      .lean()
      .populate('halls')
      .populate('shops')
      .populate('films')
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
    let findQuery = this.cinemaService.find(query.conditions).lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    findQuery
      .populate('halls')
      .populate('shops')
      .populate('films')
    const count = await this.cinemaService.find(query.conditions).countDocuments().exec();
    const cinemas = await findQuery.exec();
    return this.wrapSuccess({
      cinemas,
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
      .populate('halls')
      .populate('shops')
      .populate('films')
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

