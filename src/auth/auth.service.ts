import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '~/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UserService
  ) {
  };

  public getJWTToken(userId: number): string | boolean {
    try {
      const payload = {
        userId
      };

      return sign(payload, process.env.JWT_SECRET);

    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  public async createDefaultUser() {
    const usersCount = await this.userSerivce.find({}).count().exec();
    if (!usersCount) {
      const { hashedPassword, salt } = await this.userSerivce.hashPassword('tusuronelove');
      await this.userSerivce.create({
        email: 'admin@default.com',
        name: 'Default Administrator',
        password: hashedPassword,
        salt,
      });
    }
  }
}
