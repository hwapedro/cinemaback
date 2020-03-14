import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';

/*
Фамилия	Имя	Биография
Текстовый	Текстовый	Текстовый
 */
export class Actor {
  @prop()
  name: string;

  @prop()
  bio: string;
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