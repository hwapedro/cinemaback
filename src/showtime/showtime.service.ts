import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ShowtimeModel, Showtime } from './showtime.model';

@Injectable()
export class ShowtimeService {
  constructor(

  ) { }

  create(body: Partial<Showtime>) {
    return ShowtimeModel.create(body);
  }

  findById(id: string) {
    return ShowtimeModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ShowtimeModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return ShowtimeModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return ShowtimeModel.deleteMany(conditions);
  }

  raw() {
    return ShowtimeModel;
  }
}
