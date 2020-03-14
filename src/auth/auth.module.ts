import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtQueryStrategy } from './jwt-query.strategy';
import { DatabaseModule } from '~/common/database/database.module';
import { UserModule } from '~/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtQueryStrategy,
  ]
})
export class AuthModule { }
