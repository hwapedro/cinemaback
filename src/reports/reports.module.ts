import { Module, forwardRef } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TicketModule } from '~/ticket/ticket.module';
import { CinemaModule } from '~/cinema/cinema.module';

@Module({
  imports: [
    forwardRef(() => TicketModule),
    forwardRef(() => CinemaModule)
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule { }