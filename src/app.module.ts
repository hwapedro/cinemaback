import { Module, HttpModule } from '@nestjs/common';
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
import { ShowtimeModule } from './showtime/showtime.module';
import { ImagesModule } from './images/images.module';
import { HallCellModule } from './hallCell/hallCell.module';
import { ClientModule } from './client/client.module';
import { TestModule } from './test/test.module';
import { ReportsModule } from './reports/reports.module';
import path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ROOT } from './config';

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
    ShowtimeModule,
    ImagesModule,
    HallCellModule,
    ReportsModule,
    ...(process.env.LOCAL ? [TestModule] : []),
    // main client API module
    ClientModule,

    ServeStaticModule.forRoot({
      serveRoot: '/admin',
      rootPath: path.join(ROOT, 'admin-build')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
