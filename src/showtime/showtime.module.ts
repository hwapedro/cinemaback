import { Module, forwardRef } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { ShowtimeController } from './showtime.controller';
import { FilmModule } from '~/film/film.module';
import { HallModule } from '~/hall/hall.module';

@Module({
  imports: [
    forwardRef(() => FilmModule),
    forwardRef(() => HallModule),
  ],
  controllers: [ShowtimeController],
  providers: [ShowtimeService],
  exports: [ShowtimeService],
})
export class ShowtimeModule { }