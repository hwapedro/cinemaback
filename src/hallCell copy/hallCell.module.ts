import { Module } from '@nestjs/common';
import { HallCellService } from './hallCell.service';
import { HallCellController } from './hallCell.controller';

@Module({
  imports: [],
  controllers: [HallCellController],
  providers: [HallCellService],
  exports: [HallCellService],
})
export class HallCellModule { }