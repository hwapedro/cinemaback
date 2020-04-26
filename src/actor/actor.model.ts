import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { AdminFieldType } from '~/common/decorators';
import { FilmModel } from '~/film/film.model';
import { oidToString } from '~/common/scripts/oidToString';

/*
Фамилия	Имя	Биография
Текстовый	Текстовый	Текстовый
 */
@pre<Actor>('remove', async function (next) {
  try {
    const actorId = oidToString(this._id);
    await FilmModel.updateMany({}, {
      $pullAll: { actors: [actorId] }
    });
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
export class Actor extends BaseMongooseModel {
  @prop()
  name: string;

  @AdminFieldType('textarea')
  @prop()
  bio: string;

  @prop()
  image: string;
}

export const ActorModel = getModelForClass(Actor, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'actors',
  },
  options: {
    ...defaultOptions,
  }
});