import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ShopModel, Shop } from './shop.model';
import { OrderedItemValidator } from '~/client/payment/validators';
import { BoughtItem } from '~/ticket/ticket.model';
import { ShopItemService } from '~/shopItem/shopItem.service';
import { oidToString } from '~/common/scripts/oidToString';
import { ShopItem } from '~/shopItem/shopItem.model';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => ShopItemService)) private shopItemService: ShopItemService,
  ) { }

  create(body: Partial<Shop>) {
    return ShopModel.create(body);
  }

  findById(id: string) {
    return ShopModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ShopModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return ShopModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return ShopModel.deleteMany(conditions);
  }

  raw() {
    return ShopModel;
  }

  async validateOrder(orderedItems: OrderedItemValidator[]): Promise<[boolean, BoughtItem[]] | [boolean, string, OrderedItemValidator[]]> {
    const items = await this.shopItemService.find({
      _id: { $in: orderedItems.map(item => item.item) },
    });
    const dbItemsMap: { [key: string]: ShopItem } = Object.fromEntries(items.map(item => [
      oidToString(item._id),
      item
    ]));
    if (items.length < orderedItems.length) {
      return [
        false,
        'invalid-items',
        orderedItems.filter(item => !items.find(dbItem => dbItem._id === item.item)),
      ];
    } 
    const notInStock: OrderedItemValidator[] = orderedItems.filter(orderedItem => !dbItemsMap[orderedItem.item].inStock);
    if (notInStock.length) {
      return [
        false,
        'not-in-stock',
        notInStock
      ];
    }
    return [
      true,
      orderedItems.map(item => ({
        item: item.item as any,
        price: item.quantity * dbItemsMap[item.item].price,
        quantity: item.quantity,
      } as BoughtItem)),
    ];
  }
}
