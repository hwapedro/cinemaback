import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { Response } from './swagger'


@Controller('api/v1/auth')
@ApiTags('auth')
@ApiExtraModels(Response.Successful, Response.NeedRegistrationResponse, Response.Unsuccessful)
export class AuthController extends BaseController {
  constructor (
    private service: AuthService,
  ) {
    super();
  }


  // @Get(':socialNetworkType/:socialNetworkToken')
  // @ApiParam({ name: 'socialNetworkType', type: 'string', description: 'can be only google' })
  // @ApiParam({ name: 'socialNetworkToken', type: 'string', description: 'google token' })
  // @ApiOperation({ summary: 'auth user', description: 'You can auth only with social network google' })
  // @ApiResponse({
  //   status: 200,
  //   schema: {
  //     oneOf: [
  //       { $ref: getSchemaPath(Response.Unsuccessful) },
  //       { $ref: getSchemaPath(Response.NeedRegistrationResponse) },
  //       { $ref: getSchemaPath(Response.Successful) },
  //     ],
  //   },
  //   description: 'unsuccessful - auth validations and if need auth at first. Successful when auth is ok',
  // })
  // async login (@Param('socialNetworkType') socialNetworkType, @Req() req) {
  //   const user = await this.usersService.getUserBySocialNetworkId(req.socialNetworkId);

  //   if (!user) {
  //     return { success: false, status: 'need-registration' };
  //   } else {
  //     // get unread actions count = unread dialogs count + unviewed matches count
  //     const unreadDialogsCount = await this.dialogsService.getUnreadCountForUser(user.id);
  //     // TODO: append unviewed matches count to this
  //     const actionsCount = unreadDialogsCount + 0;
  //     const wrappedUser = {
  //       ...this.usersService.getSafeUserDataWithAvatar(user),
  //       notificationSettings: user.notificationSettings,
  //     };

  //     return this.wrapSuccess({
  //       user: wrappedUser,
  //       actionsCount,
  //       token: await this.service.getJWTToken(req.socialNetworkId, socialNetworkType, user.id),
  //     });
  //   }
  // }
}

