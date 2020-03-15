import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { CinemaClientController } from './cinema.client.controller';

@Module({
  imports: [],
  controllers: [CinemaController, CinemaClientController],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class CinemaModule { }