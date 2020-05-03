import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Query, Inject, forwardRef, ParseIntPipe } from '@nestjs/common';
import BaseController from '~/common/BaseController';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import log from 'color-log';
import { ObjectId, OId, ModelMap } from '~/types';
import _ from 'lodash';
import { mongoose } from '@typegoose/typegoose';
import { GenreService } from '~/genre/genre.service';
import { AgeRuleService } from '~/ageRule/ageRule.service';
import { Genre } from '~/genre/genre.model';
import { NewsQueryValidator } from './validators';
import { AgeRule } from '~/ageRule/ageRule.model';
import { Actor } from '~/actor/actor.model';
import { NewsService } from '~/news/news.service';

@Controller('client/api/v1/news')
@ApiTags('client/news')
export class ClientNewsController extends BaseController {
  constructor(
    @Inject(forwardRef(() => NewsService)) private newsService: NewsService,
  ) {
    super();
  }

  @Get()
  async getNews(
    @Query() query: NewsQueryValidator,
  ) {
    const limit = +query.limit;
    const skip = +query.skip;
    const [news, count] = await this.newsService.getClientNews(+limit, +skip);
    return this.wrapSuccess({
      news,
      hasMore: ((skip || 0) + (limit || 1)) < count,
      total: count,
    });
  }
}

