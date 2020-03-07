import { Injectable } from '@nestjs/common';
import { User, UserClass } from './users.model';

@Injectable()
export class UsersService {
  constructor(
  ) {
  };

  async create(body: Partial<UserClass>) {
    return await User.create(body);
  }

  async findById(id: string) {
    return await User.findById(id);
  }
}
