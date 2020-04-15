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

@Controller('client/api/v1/payment')
@ApiTags('client/payment')
export class PaymentController extends BaseController {
  constructor(
    @Inject(forwardRef(() => PaymentService)) private paymentService: PaymentService,
    @Inject(forwardRef(() => ShowtimeService)) private showtimeService: ShowtimeService,
    @Inject(forwardRef(() => FilmService)) private filmService: FilmService,
    @Inject(forwardRef(() => HallService)) private hallService: HallService,
    @Inject(forwardRef(() => HallCellService)) private hallCellService: HallCellService,
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
    const blockDuration = await this.paymentService.blockSeats(showtime, seats);

    return this.wrapSuccess({
      blockDuration
    });
  }

  @Post('/submit')
  async submitPayment(
    @Body() body: SubmitPaymentValidator,
  ) {
  }
}

