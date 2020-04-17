import { Module, forwardRef } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopItemModule } from '~/shopItem/shopItem.module';

@Module({
  imports: [
    forwardRef(() => ShopItemModule)
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule { }