import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { PaymentModule } from './payment/payment.module';
import { ClientCinemaModule } from './cinema/cinema.module';
import { ClientGeneralModule } from './general/general.module';
import { SoonModule } from './soon/soon.module';
import { ClientNewsModule } from './news/client.news.module';
import { ClientShopModule } from './shop/client.shop.module';

@Module({
  imports: [
    ScheduleModule,
    PaymentModule,
    ClientCinemaModule,
    ClientGeneralModule,
    ClientNewsModule,
    ClientShopModule,
    SoonModule,
  ],
  controllers: [
  ],
  providers: []
})
export class ClientModule { }
