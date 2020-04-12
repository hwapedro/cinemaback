import { prop, index, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

@index({
  index: 1,
}, { unique: true })
export class HallCell extends BaseMongooseModel {
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