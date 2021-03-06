import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { Hall } from '~/hall/hall.model';
import { Shop } from '~/shop/shop.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { Showtime } from '~/showtime/showtime.model';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Наименование	Залы	Магазины	Адрес	Фильмы
Текстовый	Массив	Массив	Текстовый	Массив
 */
export class Cinema extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  address: string;

  @arrayProp({ ref: 'Hall' })
  halls: Ref<Hall>[];

  @arrayProp({ ref: 'Shop' })
  shops: Ref<Shop>[];

  @arrayProp({ ref: 'Film' })
  films: Ref<Film>[];

  @arrayProp({ ref: 'Showtime' })
  showtimes: Showtime[];
}

export const CinemaModel = getModelForClass(Cinema, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'cinemas',
  },
  options: {
    ...defaultOptions,
  }
});