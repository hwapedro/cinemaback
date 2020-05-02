import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { ShopService } from './shop.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';

@Controller('api/v1/shops')
@ApiTags('auth')
export class ShopController extends BaseController {
  constructor(
    private readonly shopService: ShopService,
  ) {
    super();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getById(
    @Param('id') id: string,
    @Req() req,
  ) {
    const shop = await this.shopService.findById(id)
      .lean()
      .populate('shopItems')
      .exec();
    return this.wrapSuccess({
      shop,
    });
  }

  @Post('/query')
  @UseGuards(AuthGuard('jwt'))
  async getAll(
    @Body() query: QueryValidator,
    @Req() req,
  ) {
    let findQuery = this.shopService.find(query.conditions)
      .populate('shopItems')
      .lean();
    if (query.limit) {
      findQuery = findQuery.limit(query.limit);
    }
    if (query.skip) {
      findQuery = findQuery.skip(query.skip);
    }
    const count = await this.shopService.find(query.conditions).countDocuments().exec();
    const shops = await findQuery.exec();
    return this.wrapSuccess({
      shops,
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
    const shop = await this.shopService.create(body);
    await shop
      .populate('shopItems')
      .execPopulate();
    return this.wrapSuccess({
      shop
    });
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @Req() req,
  ) {
    const updated = await this.shopService.raw()
      .findByIdAndUpdate(id, body, { new: true })
      .populate('shopItems')
      .lean()
      .exec();
    return this.wrapSuccess({
      shop: updated,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    const shop = await this.shopService.findById(id).exec();
    if (shop) {
      await shop.remove();
    }
    return this.wrapSuccess();
  }
}

