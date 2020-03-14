import { Injectable } from '@nestjs/common';
import { UserModel, User } from './user.model';
import { ModelUpdateOptions } from 'mongoose';

@Injectable()
export class UserService {
  constructor(

  ) { }

  create(body: Partial<User>) {
    return UserModel.create(body);
  }

  findById(id: string) {
    return UserModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return UserModel.find(conditions, projection, options);
  }

  update(conditions: any, doc: any, options?: ModelUpdateOptions) {
    return UserModel.update(conditions, doc, options);
  }

  delete(conditions: any) {
    return UserModel.deleteMany(conditions);
  }

  raw() {
    return UserModel;
  }
}
