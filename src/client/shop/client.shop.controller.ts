import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, Query, Inject, forwardRef, ParseIntPipe } from '@nestjs/common';
import BaseController from '~/common/BaseController';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import log from 'color-log';
import _ from 'lodash';
import { mongoose } from '@typegoose/typegoose';
import { ShopService } from '~/shop/shop.service';
import { ShopItemService } from '~/shopItem/shopItem.service';
import { ShopsQueryValidator, ShopItemsQueryValidator } from './validators';
import { CinemaModel } from '~/cinema/cinema.model';
import { oidToString } from '~/common/scripts/oidToString';


@Controller('client/api/v1/shops')
@ApiTags('client/shops')
export class ClientShopController extends BaseController {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    @Inject(forwardRef(() => ShopItemService)) private shopItemService: ShopItemService,
  ) {
    super();
  }

  @Get()
  async getAllShops(
    @Query() query: ShopsQueryValidator,
  ) {
    const { cinema: cinemaId } = query;
    // ensure cinema exists
    const cinema = await CinemaModel.findById(cinemaId).lean().exec();
    if (!cinema) {
      return this.wrapError('No cinema');
    }

    const shops = await this.shopService.find({
      _id: { $in: cinema.shops }
    })
      .lean()
      .exec();

    const items = shops.flatMap(shop => shop.shopItems)
      .map(this.shopItemService.wrapClient);
    return this.wrapSuccess({
      shops: shops.map(shop => {
        // shop.shopItems = shop.shopItems.map(si => (si as any)._id);
        return this.shopService.wrapClient(shop);
      }),
      items,
    });
  }

  @Get(':shopId/items')
  async getItems(
    @Query() query: ShopItemsQueryValidator,
    @Param('shopId') shopId: string,
  ) {
    // ensure shop
    const shop = await this.shopService.findById(shopId).lean().exec();
    if (!shop) {
      return this.wrapError('No such shop');
    }
    const limit = +query.limit;
    const skip = +query.skip;
    const [items, total] = await this.shopItemService.getClientItems({
      _id: { $in: shop.shopItems }
    }, +limit, +skip);
    console.log(items);

    return this.wrapSuccess({
      items: items.map(this.shopItemService.wrapClient),
      hasMore: ((skip || 0) + (limit || 1)) < total,
      total,
    });
  }
}

