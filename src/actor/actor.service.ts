import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ActorModel, Actor } from './actor.model';

@Injectable()
export class ActorService {
  constructor(

  ) { }

  create(body: Partial<Actor>) {
    return ActorModel.create(body);
  }

  findById(id: string) {
    return ActorModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ActorModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return ActorModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return ActorModel.deleteMany(conditions);
  }

  raw() {
    return ActorModel;
  }
}
