import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { HallService } from './hall.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/halls')
@ApiTags('auth')
export class HallController extends BaseController {
  constructor(
    private readonly hallService: HallService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const hall = await this.hallService.findById(id)
      .lean()
      .exec();
    return this.wrapSuccess({
      hall,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.hallService.find(query.conditions).lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.hallService.find(query.conditions).countDocuments().exec();
    const halls = await findQuery.exec();
    return this.wrapSuccess({
      halls,
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
    const hall = await this.hallService.create(body);
    return this.wrapSuccess({
      hall
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.hallService.raw()
      .findByIdAndUpdate(id, body, { new: true })
      .lean()
      .exec();
    return this.wrapSuccess({
      hall: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    const hall = await this.hallService.findById(id).exec();
    if (hall) {
      await hall.remove();
    }
    return this.wrapSuccess();
  }
}

