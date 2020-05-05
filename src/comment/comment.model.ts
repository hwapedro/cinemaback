import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

/*
Текст	Дата и время
Текстовый	Дата
 */
export class Comment {
  @prop()
  text: string;

  @prop({ default: () => Date.now() })
  time: Date;
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