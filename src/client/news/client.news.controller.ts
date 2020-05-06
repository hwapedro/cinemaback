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
import { NewsQueryValidator, PostCommentValidator, CommentsQueryValidator } from './validators';
import { AgeRule } from '~/ageRule/ageRule.model';
import { Actor } from '~/actor/actor.model';
import { NewsService } from '~/news/news.service';
import { CommentService } from '~/comment/comment.service';
import { oidToString } from '~/common/scripts/oidToString';

@Controller('client/api/v1/news')
@ApiTags('client/news')
export class ClientNewsController extends BaseController {
  constructor(
    @Inject(forwardRef(() => NewsService)) private newsService: NewsService,
    @Inject(forwardRef(() => CommentService)) private commentService: CommentService,
  ) {
    super();
  }

  @Get(':newsId')
  async getNewsPiece(
    @Param('newsId') newsId: string,
    @Query('take', ParseIntPipe) take: number,
  ) {
    const newsItem = await this.newsService.findById(newsId).lean().exec();
    // get first comments
    const [comments, total] = await this.commentService.getComments(oidToString(newsItem._id), take, 0);
    return this.wrapSuccess({
      newsItem: this.newsService.wrap(newsItem),
      comments: comments.map(this.commentService.wrap),
      total,
      hasMore: take < total,
    });
  }

  @Get(':newsId/comments')
  async getComments(
    @Param('newsId') newsId: string,
    @Query() query: CommentsQueryValidator,
  ) {
    // get first comments
    const skip = +query.skip;
    const limit = +query.limit;
    const [comments, total] = await this.commentService.getComments(newsId, +limit, +skip);
    return this.wrapSuccess({
      comments: comments.map(this.commentService.wrap),
      total,
      hasMore: ((skip || 0) + (limit || 1)) < total,
    });
  }

  @Post(':newsId/comment')
  async postComment(
    @Param('newsId') newsId: string,
    @Body() body: PostCommentValidator
  ) {
    const newsItem = await this.newsService.findById(newsId).exec();
    if (!newsItem) {
      return this.wrapError('No news piece!');
    }
    const comment = await this.newsService.createComment({
      ...body,
      news: oidToString(newsItem._id),
    });
    return this.wrapSuccess({
      comment: this.commentService.wrap(comment),
    });
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

