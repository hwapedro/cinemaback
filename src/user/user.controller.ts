import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/users')
@ApiTags('auth')
export class UserController extends BaseController {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const user = await this.userService.findById(id)
      .lean()
      .exec();
    return this.wrapSuccess({
      user,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.userService.find(query.conditions)
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.userService.find(query.conditions).countDocuments().exec();
    const users = await findQuery.exec();
    return this.wrapSuccess({
      users: users.map(this.userService.hidePassword),
      hasMore: ((query.skip || 0) + (query.limit || 1)) < count,
      total: count,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    const { password } = body;

    const { hashedPassword, salt } = await this.userService.hashPassword(password);

    let user = await this.userService.create({
      ...body,
      password: hashedPassword,
      salt,
    });

    return this.wrapSuccess({
      user: this.userService.hidePassword(user),
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    let passwordUpdateBody: any = {};
    if (body.password) {
      // update password
      const { hashedPassword, salt } = await this.userService.hashPassword(body.password);
      passwordUpdateBody = {
        password: hashedPassword,
        salt,
      };
    }

    const updated = await this.userService.raw()
      .findByIdAndUpdate(id, {
        ...body,
        ...passwordUpdateBody,
      }, { new: true })
      .lean()
      .exec();

    return this.wrapSuccess({
      user: this.userService.hidePassword(updated),
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    await this.userService.raw()
      .findByIdAndDelete(id);
    return this.wrapSuccess();
  }
}

