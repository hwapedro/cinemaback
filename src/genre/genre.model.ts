import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';

export class Genre {
  @prop()
  name: string;
}

export const GenreModel = getModelForClass(Genre, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'genres',
  },
  options: {
    ...defaultOptions,
  }
});