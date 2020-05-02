import { WithCinema } from '~/client/common/validators';
import { IsString, IsNotEmpty, Matches, IsMongoId } from 'class-validator';

export class ScheduleCalendarQueryValidator extends WithCinema {
}

export class SoonQueryValidator  {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  cinema: string;
}