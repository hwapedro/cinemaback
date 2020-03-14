import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { ShopModule } from './shop/shop.module';
import { ShopItemModule } from './shopItem/shopItem.module';
import { NewsModule } from './news/news.module';
import { HallModule } from './hall/hall.module';
import { GenreModule } from './genre/genre.module';
import { FilmModule } from './film/film.module';
import { CommentModule } from './comment/comment.module';
import { CinemaModule } from './cinema/cinema.module';
import { AgeRuleModule } from './ageRule/ageRule.module';
import { ActorModule } from './actor/actor.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TicketModule,
    ShopModule,
    ShopItemModule,
    NewsModule,
    HallModule,
    GenreModule,
    FilmModule,
    CommentModule,
    CinemaModule,
    AgeRuleModule,
    ActorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
