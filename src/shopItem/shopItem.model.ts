import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Наименование	Стоимость	В наличии
Текстовый	Числовой	Булевый
 */
export class ShopItem extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  price: number;

  @prop()
  inStock: boolean;
}

export const ShopItemModel = getModelForClass(ShopItem, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'shopItems',
  },
  options: {
    ...defaultOptions,
  }
});