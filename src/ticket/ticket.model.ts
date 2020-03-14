import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { Hall, HallCell } from '~/hall/hall.model';
import { Shop } from '~/shop/shop.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { Cinema } from '~/cinema/cinema.model';
import { ShopItem } from '~/shopItem/shopItem.model';

export class Seat {
  @prop()
  row: number;

  @prop()
  number: number;

  @prop({ enum: HallCell })
  type: HallCell;
}

/*
Дата и время	Цена	Фильм	Кинотеатр	Заказанные позиции
Дата	Числовой	Идентификатор	Идентификатор	Массив

Места	Телефон	Фамилия	Имя	Зал
Массив	Текстовый	Текстовый	Текстовый	Идентификатор
 */
export class Ticket {
  @prop()
  time: Date;

  @prop()
  price: number;

  @prop({ ref: 'Film' })
  film: Ref<Film>;

  @prop({ ref: 'Cinema' })
  cinema: Ref<Cinema>;

  @arrayProp({ ref: 'ShopItem' })
  orderedItems: Ref<ShopItem>[];

  @arrayProp({ ref: Seat })
  seats: Ref<Seat>[];

  @prop()
  phone: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ ref: 'Hall' })
  hall: Ref<Hall>;
}

export const TicketModel = getModelForClass(Ticket, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'tickets',
  },
  options: {
    ...defaultOptions,
  }
});