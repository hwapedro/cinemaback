import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { NewsModel, News } from './news.model';
import { CommentService } from '~/comment/comment.service';
import _ from 'lodash';

@Injectable()
export class NewsService {
  constructor(
    @Inject(forwardRef(() => CommentService)) private commentService: CommentService,
  ) { }

  create(body: Partial<News>) {
    return NewsModel.create(body);
  }

  findById(id: string) {
    return NewsModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return NewsModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return NewsModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return NewsModel.deleteMany(conditions);
  }

  async createComment(comment: any) {
    const c = await this.commentService.create(comment);
    return c;
  }

  async getClientNews(limit: number, skip: number): Promise<[News[], number]> {
    const query = NewsModel.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    const count = await NewsModel.find({}).countDocuments().exec();
    const news = await query.lean().exec();
    return [news, count];
  }

  wrap(newsItem: News) {
    return {
      ..._.pick(newsItem, '_id', 'title', 'text', 'comments'),
      date: newsItem.date.getTime(),
    };
  }

  raw() {
    return NewsModel;
  }
}
