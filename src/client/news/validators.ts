import { WithCinema } from '~/client/common/validators';
import { IsString, IsNotEmpty, Matches, IsMongoId, IsNumberString, MaxLength } from 'class-validator';

export class NewsQueryValidator  {
  @IsNumberString()
  skip: string;

  @IsNumberString()
  limit: string;
}

export class PostCommentValidator {
  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  text: string;
}