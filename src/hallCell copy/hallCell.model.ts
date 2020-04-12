import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';

export class HallCell {
  @prop()
  name: string;

  @prop()
  price: number;

  @prop()
  index: number;
}

export const HallCellModel = getModelForClass(HallCell, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'hallCells',
  },
  options: {
    ...defaultOptions,
  }
});