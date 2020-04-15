import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { HallModel, Hall } from './hall.model';
import _ from 'lodash';
import { HallCell } from '~/hallCell/hallCell.model';
import { HallCellService } from '~/hallCell/hallCell.service';

@Injectable()
export class HallService {
  constructor(
      @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
  ) { }

  create(body: Partial<Hall>) {
    return HallModel.create(body);
  }

  findById(id: string) {
    return HallModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return HallModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return HallModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return HallModel.deleteMany(conditions);
  }

  raw() {
    return HallModel;
  }

  async getCells(hall: Hall): Promise<HallCell[]> {
    const r = new Set<number>(hall.structure.flatMap(row => row));
    return await this.hallCellService.find({
      index: { $in: Array.from(r.values()) }
    }).lean().exec();
  }

  wrap(hall: Hall, exclude: string[] = []): Hall & any {
    const o: any = { ..._.omit(hall, exclude) };
    if (!exclude.includes('_id'))
      o['_id'] = hall._id.toString();
    return o;
  }
}
