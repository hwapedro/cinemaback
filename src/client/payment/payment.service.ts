import { Injectable } from '@nestjs/common';
import { Showtime } from '~/showtime/showtime.model';
import { PaymentSeat } from './validators';
import { DocumentType } from '@typegoose/typegoose';
import { SEAT_BLOCK_DURATION_SEC } from '../seatBlock/constants';
import { SeatBlock, SeatBlockModel } from '../seatBlock/seatBlock.model';
import log from 'color-log';

@Injectable()
export class PaymentService {
  constructor(
  ) { }

  async seatsAreFree(showtime: Showtime, seats: PaymentSeat[]): Promise<PaymentSeat[]> {
    const takenSeats = await SeatBlockModel.find({
      showtime: showtime._id.toString(),
      seat: { $in: seats.map(this.serializeSeat) },
    }).lean<SeatBlock>().exec();

    if (takenSeats.length) {
      return takenSeats.map(({ seat }) => {
        const [row, cell] = this.deserializeSeat(seat);
        return {
          row,
          cell,
        };
      });
    }
    return [];
  }

  async blockSeats(showtime: DocumentType<Showtime>, seats: PaymentSeat[]): Promise<number> {
    for (const seat of seats) {
      showtime.taken.push({
        ...seat,
        paid: false,
        until: Date.now() + SEAT_BLOCK_DURATION_SEC,
      });
      // insert new block
      const block = await SeatBlockModel.create({
        createdAt: new Date(),
        seat: this.serializeSeat(seat),
        showtime: showtime._id,
      });
    }
    await showtime.save();
    return SEAT_BLOCK_DURATION_SEC;
  }

  serializeSeat(seat: PaymentSeat): string {
    return `${seat.row}-${seat.cell}`;
  }

  deserializeSeat(seat: string): number[] {
    return seat.split('-').map(rc => +rc);
  }
}
