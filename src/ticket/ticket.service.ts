import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { TicketModel, Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(

  ) { }

  create(body: Partial<Ticket>) {
    return TicketModel.create(body);
  }

  findById(id: string) {
    return TicketModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return TicketModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return TicketModel.update(conditions, body, options);
  }

  delete(conditions: any) {
    return TicketModel.deleteMany(conditions);
  }

  raw() {
    return TicketModel;
  }
}
