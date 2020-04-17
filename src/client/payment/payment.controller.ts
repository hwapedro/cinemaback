import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Query, Inject, forwardRef } from '@nestjs/common';
import BaseController from '~/common/BaseController';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { PaymentService } from './payment.service';
import { ShowtimeService } from '~/showtime/showtime.service';
import { StartPaymentValidator, SubmitPaymentValidator } from './validators';
import { FilmService } from '~/film/film.service';
import { HallService } from '~/hall/hall.service';
import { HallCellService } from '~/hallCell/hallCell.service';
import _ from 'lodash';
import log from 'color-log';
import { Showtime } from '~/showtime/showtime.model';
import { TicketService } from '~/ticket/ticket.service';
import { ShopService } from '~/shop/shop.service';
import { BoughtItem } from '~/ticket/ticket.model';

@Controller('client/api/v1/payment')
@ApiTags('client/payment')
export class PaymentController extends BaseController {
  constructor(
    @Inject(forwardRef(() => PaymentService)) private paymentService: PaymentService,
    @Inject(forwardRef(() => ShowtimeService)) private showtimeService: ShowtimeService,
    @Inject(forwardRef(() => TicketService)) private ticketService: TicketService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {
    super();
  }

  @Post('/start')
  async startPayment(
    @Body() body: StartPaymentValidator,
  ) {
    const { seats, showtimeId } = body;
    // ensure showtime exists
    const showtime = await this.showtimeService.findById(showtimeId).exec();
    if (!showtime) {
      return this.wrapError('No such showtime');
    }

    // ensure all seats are free
    let seatsNotFree = await this.paymentService.seatsAreFree(showtime, seats);
    if (seatsNotFree.length) {
      return this.wrapFail({
        status: 'taken',
        seats: seatsNotFree
      });
    }
    // block seats for 5 mins -- give user time to pay
    const [blockDuration, blockId] = await this.paymentService.blockSeats(showtime, seats);

    return this.wrapSuccess({
      blockDuration,
      blockId
    });
  }

  @Post('/submit')
  async submitPayment(
    @Body() body: SubmitPaymentValidator,
  ) {
    const {
      firstName,
      lastName,
      orderId,
      orderedItems,
      phone,
      blockId,
      showtimeId,
    } = body;
    // validate that purchase is valid
    const showtime = await this.showtimeService.findById(showtimeId).exec();
    if (!showtime) {
      return this.wrapError('Invalid showtime');
    }

    // find ordered items
    const [allGood, statusOrBoguth, badItems] = await this.shopService.validateOrder(orderedItems);
    if (!allGood) {
      return this.wrapFail({
        status: statusOrBoguth,
        items: badItems
      });
    }

    // validate blocked seats
    const blockedSeats = await this.paymentService.validateBlock(blockId);
    if (!blockedSeats.length) {
      return this.wrapFail({
        status: 'too-late'
      });
    }

    await this.ticketService.create({
      firstName,
      lastName,
      orderedItems: statusOrBoguth as BoughtItem[],
    });
    showtime.taken.push(...blockedSeats.map(seat => {
      const [row, cell] = this.paymentService.deserializeSeat(seat.seat);
      return {
        row,
        cell,
        paid: true,
      };
    }));
    await showtime.save();
  }
}

