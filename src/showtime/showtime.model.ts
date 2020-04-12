import { prop, arrayProp, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Hall } from '~/hall/hall.model';
import { Shop } from '~/shop/shop.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

class TakenSeat {
  row: number;
  cell: number;
  paid: boolean;
  until?: number;
}

export class Showtime {
  @prop()
  time: Date;

  @prop({ ref: Film })
  film: Ref<Film>;

  @prop({ ref: 'Hall' })
  hall: Ref<Hall>;

  @prop({ type: mongoose.Schema.Types.Mixed })
  taken: TakenSeat[];
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