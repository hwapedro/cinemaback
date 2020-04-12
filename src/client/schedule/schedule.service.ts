import { Injectable } from '@nestjs/common';
import { ShowtimeModel } from '~/showtime/showtime.model';

@Injectable()
export class ScheduleService {
  constructor(

  ) { }

  findById(id: string) {
    return ShowtimeModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ShowtimeModel.find(conditions, projection, options);
  }
}
