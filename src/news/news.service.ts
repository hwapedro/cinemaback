import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { NewsModel, News } from './news.model';

@Injectable()
export class NewsService {
  constructor(

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

  raw() {
    return NewsModel;
  }
}
