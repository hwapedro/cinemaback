import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse, UnsuccessfulResponse } from '../common/swagger';

export namespace Response {
  export class Unsuccessful extends UnsuccessfulResponse {
  }

  export class NeedRegistrationResponse {
    @ApiProperty({ enum: [false] })
    success: boolean;

    @ApiProperty({ enum: ['need-registration'] })
    status: string;
  }

  export class Successful extends SuccessResponse {
    @ApiProperty({ example: 'sdfsdfw32rijbsifbi3bfs' })
    token: string;
  }
}





