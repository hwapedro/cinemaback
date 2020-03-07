import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() {
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
}
