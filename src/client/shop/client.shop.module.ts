import { Module, forwardRef } from '@nestjs/common';
import { ClientShopController } from './client.shop.controller';
import { ShopModule } from '~/shop/shop.module';
import { ShopItemModule } from '~/shopItem/shopItem.module';

@Module({
  imports: [
    forwardRef(() => ShopModule),
    forwardRef(() => ShopItemModule)
  ],
  controllers: [
    ClientShopController
  ],
  providers: [
  ],
  exports: []
})
export class ClientShopModule { }
