import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { AgeRuleModel, AgeRule } from './ageRule.model';

@Injectable()
export class AgeRuleService {
  constructor(

  ) { }

  create(body: Partial<AgeRule>) {
    return AgeRuleModel.create(body);
  }

  findById(id: string) {
    return AgeRuleModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return AgeRuleModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return AgeRuleModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return AgeRuleModel.deleteMany(conditions);
  }

  raw() {
    return AgeRuleModel;
  }
}
