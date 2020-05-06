import 'module-alias/register';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { ActorService } from './actor/actor.service';
import { AgeRuleService } from './ageRule/ageRule.service';
import { CinemaService } from './cinema/cinema.service';
import { CommentService } from './comment/comment.service';
import { GenreService } from './genre/genre.service';
import { HallService } from './hall/hall.service';
import { NewsService } from './news/news.service';
import { ShopService } from './shop/shop.service';
import { ShopItemService } from './shopItem/shopItem.service';
import { ShowtimeService } from './showtime/showtime.service';
import { FilmService } from './film/film.service';
import { TicketService } from './ticket/ticket.service';
import moment from 'moment';
import { ObjectId } from './types';
import log from 'color-log';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    exceptionFactory: errors => {
      const totalError: string[] = [];
      errors.forEach(error => {
        log.error(error);
        totalError.push(error.constraints ? Object.values(error.constraints).join(', ') : `something wrong with ${error.property}`);
      })
      throw new BadRequestException(`Error: ${totalError.join('; ')}`);
    }
  }));

  await app.listen(+process.env.PORT);

  // generate frontend models
  // require('./models').generate();

  // generate default admin user
  await app.get(AuthService).createDefaultUser();
    console.error('Started on port', process.env.PORT)

  // create test
  if (false) {
    const ss = app.get(ShowtimeService);
    await ss.delete({});
    await ss.create({
      time: moment().subtract(2, 'hours').toDate(),
      hall: '5e92c612ea88031fd4a19366' as any,
      film: '5e789b9d8b3ca61d387aecfb' as any,
      taken: [{
        row: 1,
        cell: 2,
      }],
    });
    await ss.create({
      time: moment().add(19, 'hours').toDate(),
      hall: '5e92c612ea88031fd4a19366' as any,
      film: '5e7cdc3c82ed181c20a3a3be' as any,
      taken: [{
        row: 0,
        cell: 0,
      }, {
        row: 0,
        cell: 1,
      }]
    });
  }
}
bootstrap();
