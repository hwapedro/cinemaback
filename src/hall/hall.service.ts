import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { HallModel, Hall } from './hall.model';
import _ from 'lodash';

@Injectable()
export class HallService {
  constructor(

  ) { }

  create(body: Partial<Hall>) {
    return HallModel.create(body);
  }

  findById(id: string) {
    return HallModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return HallModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return HallModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return HallModel.deleteMany(conditions);
  }

  raw() {
    return HallModel;
  }

  wrap(hall: Hall, exclude: string[] = []): Hall & any {
    const o: any = { ..._.omit(hall, exclude) };
    if (!exclude.includes('_id'))
      o['_id'] = hall._id.toString();
    return o;
  }
}
