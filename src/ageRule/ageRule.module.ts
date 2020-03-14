import { Module } from '@nestjs/common';
import { AgeRuleService } from './ageRule.service';
import { AgeRuleController } from './ageRule.controller';

@Module({
  imports: [],
  controllers: [AgeRuleController],
  providers: [AgeRuleService],
  exports: [AgeRuleService],
})
export class AgeRuleModule { }