import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

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