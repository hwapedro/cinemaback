import { Controller, Get, Param, Req, Res, UseGuards, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';


@Controller('api/v1/users')
@ApiTags('auth')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }


  @Post('/')
  async create(
    @Body() body,
    @Req() req
  ) {
    const user = await this.userService.create(body);
    return this.wrapSuccess({
      user
    });
  }

  @Get('/:id')
  async getById(
    @Param() params: any
  ) {

  }
}

