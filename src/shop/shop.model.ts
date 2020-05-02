import { prop, arrayProp, getModelForClass, Ref } from '@typegoose/typegoose';
import { ShopItem } from '~/shopItem/shopItem.model';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { Cinema } from '~/cinema/cinema.model';

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
  shopItems: Ref<ShopItem>[];

  @prop({ ref: 'Cinema' })
  cinema: Ref<Cinema>;
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