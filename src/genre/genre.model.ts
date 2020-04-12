import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

export class Genre extends BaseMongooseModel {
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