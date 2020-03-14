import { prop, getModelForClass } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';

/*
Наименование	Стоимость	В наличии
Текстовый	Числовой	Булевый
 */
export class ShopItem {
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