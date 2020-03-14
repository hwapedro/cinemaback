import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';
import { AgeRule } from '~/ageRule/ageRule.model';
import { Actor } from '~/actor/actor.model';
import { Genre } from '~/genre/genre.model';

/*
Наименование	Дата выпуска	Дата начала проката	Дата  окончания проката	Описание
Текстовый	Дата	Дата	Дата	Текстовый

Актеры	Жанры	Длительность	Возрастное ограничение	Сеансы
Массив	Массив	Числовой	Идентификатор	Массив
 */
export class Film {
  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  // in minutes
  duration: number;

  @prop({ ref: AgeRule })
  ageRule: Ref<AgeRule>;

  @prop()
  releaseDate: Date;

  @prop()
  distributionStartDate: Date;

  @prop()
  distributionEndDate: Date;

  @arrayProp({ ref: 'Actor' })
  actors: Ref<Actor>[];

  @arrayProp({ ref: 'Genre' })
  genres: Ref<Genre>[];
}

export const FilmModel = getModelForClass(Film, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'films',
  },
  options: {
    ...defaultOptions,
  }
});