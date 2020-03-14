import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions } from './database/constants';

export class UserSchema {
  @prop()
  name: string;
}

export const User = getModelForClass(UserSchema, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'users',
  },
  options: {
  }
});