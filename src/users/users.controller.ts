import { Controller, Get, Param, Req, Res, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';


@Controller('api/v1/users')
@ApiTags('auth')
export class UsersController extends BaseController {
  constructor(
    private usersService: UsersService,
  ) {
    super();
  }


  @Post('/')
  async create(
    @Body() body,
    @Req() req
  ) {
    const user = await this.usersService.create(body);
    return this.wrapSuccess({
      user
    });
  }
}

