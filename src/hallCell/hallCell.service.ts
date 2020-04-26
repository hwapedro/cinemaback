import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { HallCellModel, HallCell } from './hallCell.model';

@Injectable()
export class HallCellService {
  constructor(

  ) { }

  create(body: Partial<HallCell>) {
    return HallCellModel.create(body);
  }

  findById(id: string) {
    return HallCellModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return HallCellModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return HallCellModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return HallCellModel.deleteMany(conditions);
  }

  raw() {
    return HallCellModel;
  }
}
