import { Injectable, HttpService } from '@nestjs/common';
import { Showtime } from '~/showtime/showtime.model';
import { PaymentSeat } from './validators';
import { DocumentType } from '@typegoose/typegoose';
import { SEAT_BLOCK_DURATION_SEC } from '../seatBlock/constants';
import { SeatBlock, SeatBlockModel } from '../seatBlock/seatBlock.model';
import log from 'color-log';
import uniqid from 'uniqid';
import PaypalCheckoutSDK from '@paypal/checkout-server-sdk';

const PAYPAL_URL = process.env.LOCAL ? 'https://api.sandbox.paypal.com' : 'https://api.sandbox.paypal.com';
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
let environment = new PaypalCheckoutSDK.core.SandboxEnvironment(clientId, clientSecret);
let client = new PaypalCheckoutSDK.core.PayPalHttpClient(environment);

@Injectable()
export class PaymentService {
  constructor(
    private httpService: HttpService,
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

    // check in showtime
    const takenInShowtime = seats.filter(seat => {
      const takenSeat = showtime.taken.find(el => el.row === seat.row && el.cell === seat.cell);
      return takenSeat;
    })
    if (takenInShowtime.length) {
      // some seat is taken
      return takenInShowtime;
    }
    return [];
  }

  async blockSeats(showtime: DocumentType<Showtime>, seats: PaymentSeat[]): Promise<[number, string]> {
    const blockId = uniqid();
    showtime.taken = showtime.taken || [];
    for (const seat of seats) {
      // insert new block
      const block = await SeatBlockModel.create({
        createdAt: new Date(),
        blockId,
        seat: this.serializeSeat(seat),
        showtime: showtime._id,
      });
    }
    await showtime.save();
    return [SEAT_BLOCK_DURATION_SEC, blockId];
  }

  async removeBlock(blockId: string) {
    await SeatBlockModel.deleteMany({
      blockId,
    }).exec();
  }

  async captureTransaction(orderId: string): Promise<[boolean, Error | string]> {
    try {
      const request = new PaypalCheckoutSDK.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});
      request.path = request.path.slice(0, -1);
      let response = await client.execute(request);
      // const { data } = await this.httpService.post(`${PAYPAL_URL}${request.path}`, request.body).toPromise();
      log.mark(response);
      // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
      const captureID = response.result.purchase_units[0].payments.captures[0].id;
      return [true, captureID];
    } catch (err) {
      log.error(err);
      const errorStr = JSON.parse(err.message);
      return [false, `${errorStr.name}: ${errorStr.details[0].description}`];
    }
  }

  async validateBlock(blockId: string) {
    const blocks = await SeatBlockModel.find({
      blockId,
    }).lean().exec();
    return blocks;
  }

  serializeSeat(seat: PaymentSeat): string {
    return `${seat.row}-${seat.cell}`;
  }

  deserializeSeat(seat: string): number[] {
    return seat.split('-').map(rc => +rc);
  }
}
