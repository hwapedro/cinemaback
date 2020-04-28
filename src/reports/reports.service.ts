import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { TicketService } from '~/ticket/ticket.service';
import { TicketModel } from '~/ticket/ticket.model';

@Injectable()
export class ReportsService {
  constructor(
    @Inject(forwardRef(() => TicketService)) private ticketService: TicketService,
  ) { }
  
  raw() {
    return this.ticketService.raw();
  }
}
