import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';
/*
Заголовок	Текст	Дата	Комментарии
Текстовый	Текстовый	Дата	Массив
 */
export class News {
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