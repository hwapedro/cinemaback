import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';

/*
Текст	Дата и время
Текстовый	Дата
 */
export class Comment {
  @prop()
  text: string;

  @prop()
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