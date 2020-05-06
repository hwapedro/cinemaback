import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { News } from '~/news/news.model';

/*
Текст	Дата и время
Текстовый	Дата
 */
export class Comment {
  @prop()
  text: string;

  @prop({ default: () => Date.now() })
  time: Date;

  @prop({ ref: 'News' })
  news: Ref<News>;
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'comments',
  },
  options: {
    ...defaultOptions,
  }
});