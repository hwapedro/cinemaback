import { Module, forwardRef } from '@nestjs/common';
import { HallService } from './hall.service';
import { HallController } from './hall.controller';
import { HallCellModule } from '~/hallCell/hallCell.module';

@Module({
  imports: [
    forwardRef(() => HallCellModule)
  ],
  controllers: [HallController],
  providers: [HallService],
  exports: [HallService],
})
export class HallModule { }