import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { ShopItem } from '~/shopItem/shopItem.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/database/constants';

/*
Наименование	Описание	Товары
Текстовый	Текстовый	Массив
 */
export class Shop {
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