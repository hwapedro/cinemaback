import { WithCinema } from '~/client/common/validators';
import { IsString, IsNotEmpty, Matches, IsMongoId, IsNumberString } from 'class-validator';

export class NewsQueryValidator  {
  @IsNumberString()
  skip: string;

  @IsNumberString()
  take: string;
}