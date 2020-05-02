import { prop, arrayProp, Ref, getModelForClass, mongoose, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { oidToString } from '~/common/scripts/oidToString';
import { TicketModel } from '~/ticket/ticket.model';
import { ShowtimeModel } from '~/showtime/showtime.model';
import { CinemaModel } from '~/cinema/cinema.model';

/*
Тип	Структура
Текстовый	Массив
 */
@pre<Hall>('remove', async function (next) {
  try {
    const hallId = oidToString(this._id);
    await TicketModel.deleteMany({
      hall: hallId,
    }).exec();
    await ShowtimeModel.deleteMany({
      hall: hallId,
    }).exec();
    await CinemaModel.updateMany({}, {
      $pullAll: { halls: [hallId] }
    }, { multi: true }).exec();
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
export class Hall extends BaseMongooseModel {
  @prop()
  name: string;

  @arrayProp({ _id: false, type: mongoose.Schema.Types.Mixed, dim: 2 })
  structure: number[][];

  @prop()
  color: string;
}

export const HallModel = getModelForClass(Hall, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'halls',
  },
  options: {
    ...defaultOptions,
  }
});