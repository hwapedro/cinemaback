import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ShopModel, Shop } from './shop.model';

@Injectable()
export class ShopService {
  constructor(

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
}
