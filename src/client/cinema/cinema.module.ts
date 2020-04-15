import { Module } from '@nestjs/common';
import { ClientCinemaController } from './cinema.controller';
import { CinemaModule } from '~/cinema/cinema.module';

@Module({
  imports: [CinemaModule],
  controllers: [ClientCinemaController],
  providers: [],
  exports: [],
})
export class ClientCinemaModule { }