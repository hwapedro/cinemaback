import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

export class Image extends BaseMongooseModel {
  @prop()
  url: string;
}

export const ImageModel = getModelForClass(Image, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'images',
  },
  options: {
    ...defaultOptions,
  }
});