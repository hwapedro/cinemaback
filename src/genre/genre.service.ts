import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { GenreModel, Genre } from './genre.model';

@Injectable()
export class GenreService {
  constructor(

  ) { }

  create(body: Partial<Genre>) {
    return GenreModel.create(body);
  }

  findById(id: string) {
    return GenreModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return GenreModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return GenreModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return GenreModel.deleteMany(conditions);
  }

  raw() {
    return GenreModel;
  }
}
