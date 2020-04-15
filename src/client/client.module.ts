import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { PaymentModule } from './payment/payment.module';
import { ClientCinemaModule } from './cinema/cinema.module';
import { ClientGeneralModule } from './general/general.module';

@Module({
  imports: [
    ScheduleModule,
    PaymentModule,
    ClientCinemaModule,
    ClientGeneralModule,
  ],
  controllers: [
  ],
  providers: []
})
export class ClientModule { }
