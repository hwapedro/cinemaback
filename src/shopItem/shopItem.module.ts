import { Module } from '@nestjs/common';
import { ShopItemService } from './shopItem.service';
import { ShopItemController } from './shopItem.controller';

@Module({
  imports: [],
  controllers: [ShopItemController],
  providers: [ShopItemService],
  exports: [ShopItemService],
})
export class ShopItemModule { }