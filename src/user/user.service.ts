import { Injectable } from '@nestjs/common';
import { UserModel, User } from './user.model';

@Injectable()
export class UserService {
  constructor(
  ) {
  };

  async create(body: Partial<User>) {
    return await UserModel.create(body);
  }

  async findById(id: string) {
    return await UserModel.findById(id);
  }
}
