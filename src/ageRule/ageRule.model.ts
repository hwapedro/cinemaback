import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

export class AgeRule {
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