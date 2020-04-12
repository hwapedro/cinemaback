import { Module, forwardRef } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ShowtimeModule } from '~/showtime/showtime.module';
import { FilmModule } from '~/film/film.module';
import { HallModule } from '~/hall/hall.module';
import { HallCellModule } from '~/hallCell/hallCell.module';

@Module({
  imports: [
    forwardRef(() => ShowtimeModule),
    forwardRef(() => FilmModule),
    forwardRef(() => HallModule),
    forwardRef(() => HallCellModule),
  ],
  controllers: [
    PaymentController
  ],
  providers: [
    PaymentService
  ],
  exports: [PaymentService]
})
export class PaymentModule { }
