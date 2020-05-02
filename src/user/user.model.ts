import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

export class User {
  @prop()
  name: string;
  
  @prop()
  email: string;

  @prop()
  password: string;

  @prop()
  salt: string;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'users',
  },
  options: {
    ...defaultOptions,
  }
});