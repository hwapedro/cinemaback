import { prop, index, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { Showtime } from '~/showtime/showtime.model';
import { SEAT_BLOCK_DURATION_SEC } from './constants';

@index({ createdAt: 1 }, { expireAfterSeconds: SEAT_BLOCK_DURATION_SEC })
export class SeatBlock extends BaseMongooseModel {
  @prop()
  createdAt: Date;

  @prop()
  seat: string;

  @prop({ ref: 'Showtime' })
  showtime: Ref<Showtime>;
}

export const SeatBlockModel = getModelForClass(SeatBlock, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'seatBlocks',
  },
  options: {
    ...defaultOptions,
  }
});