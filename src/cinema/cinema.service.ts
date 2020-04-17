import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions, DocumentQuery } from 'mongoose';
import { CinemaModel, Cinema } from './cinema.model';

@Injectable()
export class CinemaService {
  constructor(

  ) { }

  create(body: Partial<Cinema>) {
    return CinemaModel.create(body);
  }

  findById(id: string) {
    return CinemaModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return CinemaModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return CinemaModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return CinemaModel.deleteMany(conditions);
  }

  raw() {
    return CinemaModel;
  }
}
