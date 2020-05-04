import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { FilmModel } from '~/film/film.model';
import { oidToString } from '~/common/scripts/oidToString';

@pre<Genre>('remove', async function (next) {
  try {
    const genreId = oidToString(this._id);
    await FilmModel.updateMany({}, {
      $pullAll: { genres: [genreId] }
    });
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})

export class Genre extends BaseMongooseModel {
  @prop()
  name: string;
}

export const GenreModel = getModelForClass(Genre, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'genres',
  },
  options: {
    ...defaultOptions,
  }
});