import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('/api/v1/news')
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
      .populate('comments')
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
      .populate('comments')
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.newsService.find(query.conditions).countDocuments().exec();
    const news = await findQuery.exec();
    return this.wrapSuccess({
      news,
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
    const news = await this.newsService.create(body);
    await news
      .populate('comments')
      .execPopulate()
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
      .findByIdAndUpdate(id, body, { new: true })
      .populate('comments')
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
    const news = await this.newsService.findById(id).exec();
    if (news) {
      await news.remove();
    }
  }
}

