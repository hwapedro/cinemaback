import { WithCinema } from '~/client/common/validators';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class ScheduleCalendarQueryValidator extends WithCinema {

}

export class ShowtimeQueryValidator  {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date',
  })
  from: string;
}