import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { CommentModel, Comment } from './comment.model';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class CommentService {
  constructor(

  ) { }

  create(body: Partial<Comment>) {
    return CommentModel.create(body);
  }

  findById(id: string) {
    return CommentModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return CommentModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return CommentModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return CommentModel.deleteMany(conditions);
  }

  raw() {
    return CommentModel;
  }

  async getComments(newsId: string, limit: number, skip: number): Promise<[Comment[], number]> {
    const mainQuery = {
      news: newsId
    };
    const query = CommentModel.find(mainQuery)
      .sort({ time: -1 })
      .skip(skip)
      .limit(limit);
    const count = await CommentModel.find(mainQuery).countDocuments().exec();
    const news = await query.lean().exec();
    return [news, count];
  }

  wrap(comment: DocumentType<Comment>) {
    return {
      _id: comment._id.toString(),
      text: comment.text,
      date: comment.time.getTime(),
      news: comment.news,
    };
  }
}
