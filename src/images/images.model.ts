import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

/*
Заголовок	Текст	Дата	Комментарии
Текстовый	Текстовый	Дата	Массив
 */
export class Image {
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