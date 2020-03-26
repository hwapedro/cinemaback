import { prop, arrayProp, Ref, getModelForClass, mongoose } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

export enum HallCell {
  EMPTY,
  STANDARD,
  PREMIUM,
  VIP
}
/*
Тип	Структура
Текстовый	Массив
 */
export class Hall {
  @prop()
  name: string;

  @arrayProp({ items: mongoose.Types.Array })
  structure: Array<Array<HallCell>>;
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