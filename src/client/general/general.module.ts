import { Module, forwardRef } from '@nestjs/common';
import { ShowtimeModule } from '~/showtime/showtime.module';
import { FilmModule } from '~/film/film.module';
import { HallModule } from '~/hall/hall.module';
import { HallCellModule } from '~/hallCell/hallCell.module';
import { ClientGeneralController } from './general.controller';
import { CinemaModule } from '~/cinema/cinema.module';
import { ShopModule } from '~/shop/shop.module';
import { GenreModule } from '~/genre/genre.module';
import { AgeRuleModule } from '~/ageRule/ageRule.module';

@Module({
  imports: [
    forwardRef(() => ShowtimeModule),
    forwardRef(() => FilmModule),
    forwardRef(() => HallModule),
    forwardRef(() => CinemaModule),
    forwardRef(() => HallCellModule),
    forwardRef(() => ShopModule),
    forwardRef(() => GenreModule),
    forwardRef(() => AgeRuleModule),
    forwardRef(() => FilmModule),
  ],
  controllers: [
    ClientGeneralController
  ],
})
export class ClientGeneralModule { }
