import { Module, forwardRef } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ShowtimeModule } from '~/showtime/showtime.module';
import { FilmModule } from '~/film/film.module';
import { HallModule } from '~/hall/hall.module';
import { HallCellModule } from '~/hallCell/hallCell.module';
import { GenreModule } from '~/genre/genre.module';
import { AgeRuleModule } from '~/ageRule/ageRule.module';

@Module({
  imports: [
    forwardRef(() => ShowtimeModule),
    forwardRef(() => FilmModule),
    forwardRef(() => HallModule),
    forwardRef(() => HallCellModule),
    forwardRef(() => GenreModule),
    forwardRef(() => AgeRuleModule),
  ],
  controllers: [
    ScheduleController
  ],
  providers: [
    ScheduleService
  ],
  exports: [ScheduleService]
})
export class ScheduleModule { }
