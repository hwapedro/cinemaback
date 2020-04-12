import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { FilmModel, Film } from './film.model';

@Injectable()
export class FilmService {
  constructor(

  ) { }

  create(body: Partial<Film>) {
    return FilmModel.create(body);
  }

  findById(id: string) {
    return FilmModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return FilmModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return FilmModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return FilmModel.deleteMany(conditions);
  }

  raw() {
    return FilmModel;
  }

  wrap(film: Film): Film & any {
    return {
      ...film,
      _id: film._id.toString(),
      releaseDate: film.releaseDate.getTime(),
      distributionEndDate: film.distributionStartDate.getTime(),
      distributionStartDate: film.distributionStartDate.getTime(),
    };
  }
}
