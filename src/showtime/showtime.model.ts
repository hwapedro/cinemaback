import { prop, arrayProp, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Hall } from '~/hall/hall.model';
import { Shop } from '~/shop/shop.model';
import { Film } from '~/film/film.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { Cinema } from '~/cinema/cinema.model';

class TakenSeat {
  row: number;
  cell: number;
}

export class Showtime extends BaseMongooseModel {
  @prop()
  time: Date;

  @prop({ ref: 'Film' })
  film: Ref<Film>;

  @prop({ ref: 'Hall' })
  hall: Ref<Hall>;

  @prop({ ref: 'Cinema' })
  cinema: Ref<Cinema>;

  @prop({ type: mongoose.Schema.Types.Mixed, default: [] })
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