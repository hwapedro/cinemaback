import { Injectable } from '@nestjs/common';
import { UserModel, User } from './user.model';
import { ModelUpdateOptions } from 'mongoose';
import crypto from 'crypto';

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
    return UserModel.updateMany(conditions, doc, options);
  }

  delete(conditions: any) {
    return UserModel.deleteMany(conditions);
  }

  hidePassword(user: User) {
    user.password = '******';
    return user;
  }

  async hashPassword(password: string, salt?: string): Promise<{ hashedPassword: string, salt: string }> {
    salt = salt || crypto.randomBytes(32).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { hashedPassword, salt };
  }

  raw() {
    return UserModel;
  }
}
