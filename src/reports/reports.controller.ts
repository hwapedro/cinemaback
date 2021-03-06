import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Inject, forwardRef } from '@nestjs/common';
import { ReportsService } from './reports.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReportGenerateValidator } from './validators';
import { OId } from '~/types';
import moment from 'moment';
import { oidToString } from '~/common/scripts/oidToString';
import { CinemaService } from '~/cinema/cinema.service';
import { TicketModel } from '~/ticket/ticket.model';

@Controller('api/v1/reports')
@ApiTags('reports')
export class ReportsController extends BaseController {
  constructor(
    private readonly reportsService: ReportsService,
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
  ) {
    super();
  }

  @Post('/generate')
  @UseGuards(AuthGuard('jwt'))
  async getReport(
    @Body() body: ReportGenerateValidator,
    @Req() req,
  ) {
    const from = moment.utc(body.from);
    const to = moment.utc(body.to);
    // aggrgate all tickets grouped by cinema
    const result = await TicketModel.aggregate([
      {
        $match: {
          time: {
            $gte: from.toDate(),
            $lte: to.toDate(),
          }
        }
      },
      {
        $group: {
          _id: '$cinema',
          income: { $sum: '$price' },
        }
      },
    ]);
    console.log(result);
    // fetch cinemas
    const cinemas = await this.cinemaService.find({
      _id: { $in: result.map(r => oidToString(r._id)) }
    }, { _id: 1, name: 1 }).lean().exec();
    const incomeByCinema = result.map(income => {
      const cinema = cinemas.find(c => oidToString(c._id) === oidToString(income._id));
      return {
        income: income.income,
        cinema: cinema ? cinema.name : 'Unknown cinema',
      };
    });
    return {
      ...body,
      income: incomeByCinema,
    }
  }
}

