import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ScheduleModule,
    PaymentModule
  ],
  controllers: [
  ],
  providers: []
})
export class ClientModule { }
