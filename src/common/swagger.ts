import { ApiProperty } from '@nestjs/swagger';

export class UnsuccessfulResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class SuccessResponse {
  @ApiProperty()
  success: boolean;
}
