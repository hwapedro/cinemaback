import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Заголовок	Текст	Дата	Комментарии
Текстовый	Текстовый	Дата	Массив
 */
export class News extends BaseMongooseModel {
  @prop()
  title: string;

  @prop()
  text: string;

  @prop()
  date: Date;

  @arrayProp({ ref: 'Comment' })
  comments: Ref<Comment>[];
}

export const NewsModel = getModelForClass(News, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'news',
  },
  options: {
    ...defaultOptions,
  }
});