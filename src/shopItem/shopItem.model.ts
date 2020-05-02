import { prop, getModelForClass, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { ShopModel } from '~/shop/shop.model';
import { oidToString } from '~/common/scripts/oidToString';

/*
Наименование	Стоимость	В наличии
Текстовый	Числовой	Булевый
 */
@pre<ShopItem>('remove', async function (next) {
  try {
    const shopItemId = oidToString(this._id);
    await ShopModel.updateMany({}, {
      $pullAll: { shopItems: [shopItemId] }
    }).exec();
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
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