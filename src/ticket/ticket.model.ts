import { prop, arrayProp, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Hall } from '~/hall/hall.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { Cinema } from '~/cinema/cinema.model';
import { ShopItem } from '~/shopItem/shopItem.model';
import { HallCell } from '~/hallCell/hallCell.model';
import { Showtime } from '~/showtime/showtime.model';
import { BaseMongooseModel } from '~/common/BaseModel';

export class Seat extends BaseMongooseModel {
  @prop()
  row: number;

  @prop()
  cell: number;

  @prop({ ref: 'HallCell' })
  type: Ref<HallCell>;
}

export class BoughtItem extends BaseMongooseModel {
  @prop({ ref: 'ShopItem' })
  item: Ref<ShopItem>

  @prop()
  quantity: number;

  @prop()
  price: number;
}


/*
Дата и время	Цена	Фильм	Кинотеатр	Заказанные позиции
Дата	Числовой	Идентификатор	Идентификатор	Массив

Места	Телефон	Фамилия	Имя	Зал
Массив	Текстовый	Текстовый	Текстовый	Идентификатор
 */
export class Ticket extends BaseMongooseModel {
  @prop({ ref: 'Showtime' })
  showtime: Ref<Showtime>;

  @prop()
  time: Date;

  @prop()
  price: number;

  @prop({ ref: 'Film' })
  film: Ref<Film>;

  @prop({ ref: 'Cinema' })
  cinema: Ref<Cinema>;

  @prop()
  transactionId: string;

  @arrayProp({ items: BoughtItem })
  orderedItems: BoughtItem[];

  @prop()
  seats: any[];

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