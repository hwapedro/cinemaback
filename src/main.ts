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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    exceptionFactory: errors => {
      const totalError: string[] = [];
      errors.forEach(error => {
        totalError.push(Object.values(error.constraints).join(', '));
      })
      throw new BadRequestException(`Error: ${totalError.join('; ')}`);
    }
  }));

  await app.listen(+process.env.PORT);

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
  if (false) {
    const { _id: actorId } = await app.get(ActorService).create({
      bio: 'Somebody once told me',
      name: 'Дмитрий Бабин'
    });
    await app.get(UserService).create({
      name: 'Dima',
      email: 'hehe@xd.cc',
      password: '12345',
    });
    const { _id: ageRuleId } = await app.get(AgeRuleService).create({
      name: '6+'
    });
    const { _id: commentId } = await app.get(CommentService).create({
      time: new Date(),
      text: '123',
    });
    const { _id: genreId } = await app.get(GenreService).create({
      name: 'Боевик'
    });
    const { _id: hallId } = await app.get(HallService).create({
      name: 'Зеленый',
      structure: [
        [1, 1],
        [2, 1]
      ]
    });
    await app.get(NewsService).create({
      date: new Date(),
      text: '1333dcwqqacfq',
      title: 'Hehe xd?',
      comments: [commentId]
    });
    const { _id: itemId } = await app.get(ShopItemService).create({
      inStock: true,
      name: 'Poop corn',
      price: 1222
    });
    const { _id: filmId } = await app.get(FilmService).create({
      actors: [actorId],
      ageRule: ageRuleId,
      description: '123',
      distributionStartDate: new Date(),
      distributionEndDate: new Date(),
      duration: 103,
      name: 'HEHE XD',
      genres: [genreId],
      releaseDate: new Date(),
    });
    const { _id: showtimeId } = await app.get(ShowtimeService).create({
      time: new Date(),
      hall: hallId,
      film: filmId
    });
    const { _id: shopId } = await app.get(ShopService).create({
      name: 'Havka',
      description: 'Best shop',
      items: [itemId]
    });
    const { _id: cinemaId } = await app.get(CinemaService).create({
      name: 'Cinema',
      address: '123',
      films: [filmId],
      halls: [hallId],
      shops: [shopId],
      showtimes: [showtimeId],
    });
    const { _id: ticketId } = await app.get(TicketService).create({
      cinema: cinemaId,
      hall: hallId,
      film: filmId,
      firstName: 'german',
      lastName: 'gorodnev',
      orderedItems: [itemId],
      phone: '+123',
      price: 52500,
      seats: [{
        row: 1,
        number: 1,
        type: 1
      }],
      time: new Date(),
    });
  }
}
bootstrap();
