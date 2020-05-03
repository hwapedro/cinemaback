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

@Controller('api/v1/reports')
@ApiTags('reports')
export class ReportsController extends BaseController {
  constructor(
    private readonly reportsService: ReportsService,
    @Inject(forwardRef(() => CinemaService)) private cinemaService: CinemaService,
  ) {
    super();
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getReport(
    @Body() body: ReportGenerateValidator,
    @Req() req,
  ) {
    const from = moment.utc(body.conditions.from);
    const to = moment.utc(body.conditions.to);
    // aggrgate all tickets grouped by cinema
    const result = await this.reportsService.raw().aggregate([
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
          _id: 'cinema',
          income: { $sum: 'price' },
        }
      },
    ]);
    // fetch cinemas
    const cinemas = await this.cinemaService.find({
      _id: { $in: result.map(r => r._id) }
    }, { _id: 1, name: 1 }).lean().exec();
    const incomeByCinema = result.map(income => ({
      income: income.income,
      cinema: cinemas.find(c => oidToString(income._id) === income.cinema),
    }))
    return {
      ...body,
      income: incomeByCinema,
    }
  }
}

