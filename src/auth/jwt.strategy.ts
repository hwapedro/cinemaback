import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '~/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload, done: Function) {
    try {
      const userRaw = await this.userService.findById(payload.userId);
      if (!userRaw) {
        return done(new UnauthorizedException('cannot find user'), false);
      }
      payload.user = userRaw;

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }

}
