import { prop, arrayProp, Ref, getModelForClass, mongoose } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

/*
Тип	Структура
Текстовый	Массив
 */
export class Hall {
  @prop()
  name: string;

  @arrayProp({ items: mongoose.Schema.Types.Mixed })
  structure: Array<Array<number>>;
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