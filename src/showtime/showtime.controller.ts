import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/showtimes')
@ApiTags('auth')
export class ShowtimeController extends BaseController {
  constructor(
    private readonly showtimeService: ShowtimeService,
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
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const showtimes = await findQuery.exec();
    return this.wrapSuccess({
      showtimes,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    const showtime = await this.showtimeService.create(body);
    return this.wrapSuccess({
      showtime
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.showtimeService.raw()
      .findByIdAndUpdate(id, body)
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
    await this.showtimeService.raw()
      .findByIdAndDelete(id);
    return this.wrapSuccess();
  }
}

