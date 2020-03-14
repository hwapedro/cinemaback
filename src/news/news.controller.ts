import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/news')
@ApiTags('auth')
export class NewsController extends BaseController {
  constructor(
    private readonly newsService: NewsService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const news = await this.newsService.findById(id)
      .lean()
      .exec();
    return this.wrapSuccess({
      news,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.newsService.find(query.conditions)
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const news = await findQuery.exec();
    return this.wrapSuccess({
      news,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    const news = await this.newsService.create(body);
    return this.wrapSuccess({
      news
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.newsService.raw()
      .findByIdAndUpdate(id, body)
      .lean()
      .exec();
    return this.wrapSuccess({
      news: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    await this.newsService.raw()
      .findByIdAndDelete(id);
    return this.wrapSuccess();
  }
}
