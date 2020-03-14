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
    return ShopItemModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return ShopItemModel.deleteMany(conditions);
  }

  raw() {
    return ShopItemModel;
  }
}
