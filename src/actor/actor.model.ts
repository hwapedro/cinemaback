import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Фамилия	Имя	Биография
Текстовый	Текстовый	Текстовый
 */
export class Actor extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  bio: string;

  @prop()
  image: string;
}

export const ActorModel = getModelForClass(Actor, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'actors',
  },
  options: {
    ...defaultOptions,
  }
});