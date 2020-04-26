import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { oidToString } from '~/common/scripts/oidToString';
import { FilmModel } from '~/film/film.model';

@pre<AgeRule>('remove', async function (next) {
  try {
    const ageRuleId = oidToString(this._id);
    await FilmModel.updateMany({}, {
      $pullAll: { actors: [ageRuleId] }
    });
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
export class AgeRule extends BaseMongooseModel {
  @prop()
  name: string;
}

export const AgeRuleModel = getModelForClass(AgeRule, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'ageRules',
  },
  options: {
    ...defaultOptions,
  }
});