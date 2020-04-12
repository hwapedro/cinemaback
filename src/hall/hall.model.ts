import { prop, arrayProp, Ref, getModelForClass, mongoose } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Тип	Структура
Текстовый	Массив
 */
export class Hall extends BaseMongooseModel {
  @prop()
  name: string;

  @arrayProp({ _id: false, type: mongoose.Schema.Types.Mixed, dim: 2 })
  structure: number[][];
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