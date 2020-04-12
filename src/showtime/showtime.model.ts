import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { Hall } from '~/hall/hall.model';
import { Shop } from '~/shop/shop.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

export class Showtime {
  @prop()
  time: Date;

  @prop({ ref: Film })
  film: Ref<Film>;

  @prop({ ref: 'Hall' })
  halls: Ref<Hall>;
}

export const ShowtimeModel = getModelForClass(Showtime, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'showtimes',
  },
  options: {
    ...defaultOptions,
  }
});