import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { HallCellService } from './hallCell.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/hallCells')
@ApiTags('auth')
export class HallCellController extends BaseController {
  constructor(
    private readonly hallCellService: HallCellService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const hallCell = await this.hallCellService.findById(id)
      .lean()
      .exec();
    return this.wrapSuccess({
      hallCell,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.hallCellService.find(query.conditions).lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.hallCellService.find(query.conditions).countDocuments().exec();
    const hallCells = await findQuery.exec();
    return this.wrapSuccess({
      hallCells,
      hasMore: ((query.skip || 0) + (query.limit || 1)) < count,
      total: count,
    });
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() body,
    @Req() req,
  ) {
    // get next index
    const lastItem = await this.hallCellService.raw()
      .findOne({})
      .sort({
        index: -1,
      })
      .limit(1)
      .exec();
    let nextIndex = lastItem ? lastItem.index + 1 : 1;
    const hallCell = await this.hallCellService.create({
      ...body,
      index: nextIndex,
    });
    return this.wrapSuccess({
      hallCell
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    delete body.index;
    const updated = await this.hallCellService.raw()
      .findByIdAndUpdate(id, body, { new: true })
      .lean()
      .exec();
    return this.wrapSuccess({
      hallCell: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    const hc = await this.hallCellService.findById(id).exec();
    if (hc) {
      const deletedIndex = hc.index;
      await hc.remove();
      // update others
      await this.hallCellService.update({
        index: { $gt: deletedIndex },
      }, {
        $inc: { index: -1 }
      }).exec();
    }
    return this.wrapSuccess();
  }
}

