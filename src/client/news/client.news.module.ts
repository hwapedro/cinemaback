import { Module, forwardRef } from '@nestjs/common';
import { ClientNewsController } from './client.news.controller';
import { ShowtimeModule } from '~/showtime/showtime.module';
import { FilmModule } from '~/film/film.module';
import { HallModule } from '~/hall/hall.module';
import { HallCellModule } from '~/hallCell/hallCell.module';
import { GenreModule } from '~/genre/genre.module';
import { AgeRuleModule } from '~/ageRule/ageRule.module';
import { NewsModule } from '~/news/news.module';
import { CommentModule } from '~/comment/comment.module';

@Module({
  imports: [
    forwardRef(() => NewsModule),
    forwardRef(() => ShowtimeModule),
    forwardRef(() => FilmModule),
    forwardRef(() => HallModule),
    forwardRef(() => HallCellModule),
    forwardRef(() => GenreModule),
    forwardRef(() => AgeRuleModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [
    ClientNewsController
  ],
  providers: [
  ],
  exports: []
})
export class ClientNewsModule { }
