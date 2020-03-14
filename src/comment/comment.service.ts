import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { CommentModel, Comment } from './comment.model';

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
    return CommentModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return CommentModel.deleteMany(conditions);
  }

  raw() {
    return CommentModel;
  }
}