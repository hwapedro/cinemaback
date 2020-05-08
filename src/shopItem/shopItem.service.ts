import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ShopItemModel, ShopItem } from './shopItem.model';

@Injectable()
export class ShopItemService {
  constructor(

  ) { }

  create(body: Partial<ShopItem>) {
    return ShopItemModel.create(body);
  }

  findById(id: string) {
    return ShopItemModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ShopItemModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return ShopItemModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return ShopItemModel.deleteMany(conditions);
  }

  async getClientItems(q: any, limit: number, skip: number): Promise<[ShopItem[], number]> {
    const query = ShopItemModel.find(q)
      .skip(skip)
      .limit(limit);
    const count = await ShopItemModel.find(q).countDocuments().exec();
    const items = await query.lean().exec();
    return [items, count];
  }

  raw() {
    return ShopItemModel;
  }

  wrapClient(shopItem: ShopItem) {
    return shopItem;
  }
}
