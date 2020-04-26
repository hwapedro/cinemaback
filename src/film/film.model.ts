import { prop, arrayProp, getModelForClass, Ref, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { AgeRule } from '~/ageRule/ageRule.model';
import { Actor } from '~/actor/actor.model';
import { Genre } from '~/genre/genre.model';
import { BaseMongooseModel } from '~/common/BaseModel';
import { CinemaModel } from '~/cinema/cinema.model';
import { oidToString } from '~/common/scripts/oidToString';
import { ShowtimeModel } from '~/showtime/showtime.model';
import { TicketModel } from '~/ticket/ticket.model';

/*
Наименование	Дата выпуска	Дата начала проката	Дата  окончания проката	Описание
Текстовый	Дата	Дата	Дата	Текстовый

Актеры	Жанры	Длительность	Возрастное ограничение	Сеансы
Массив	Массив	Числовой	Идентификатор	Массив
 */
@pre<Film>('remove', async function (next) {
  try {
    console.log('remove', this);
    const filmId = oidToString(this._id);
    await CinemaModel.updateMany({}, {
      $pullAll: { films: [filmId] }
    }).exec();
    await ShowtimeModel.deleteMany({
      film: filmId,
    }).exec();
    await TicketModel.deleteMany({
      film: filmId,
    }).exec();
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
export class Film extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  description: string;

  @prop()
  // in minutes
  duration: number;

  @prop({ ref: 'AgeRule' })
  ageRule: Ref<AgeRule>;

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