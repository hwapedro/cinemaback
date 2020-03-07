import { prop, arrayProp, getModelForClass } from '@typegoose/typegoose';

export class UserClass {
  @prop()
  name: string;
}

export const User = getModelForClass(UserClass, {
  schemaOptions: {
    collection: 'users',
    versionKey: false,
  },
  options: {
  }
});