import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { ShopItem } from '~/shopItem/shopItem.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';

/*
Наименование	Описание	Товары
Текстовый	Текстовый	Массив
 */
export class Shop extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  description: string;

  @arrayProp({ ref: 'ShopItem' })
  items: Ref<ShopItem>[];
}

export const ShopModel = getModelForClass(Shop, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'shops',
  },
  options: {
    ...defaultOptions,
  }
});