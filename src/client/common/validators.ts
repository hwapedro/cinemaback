import { IsNotEmpty, IsString } from 'class-validator';

export class WithCinema {
  @IsNotEmpty()
  @IsString()
  cinema: string;
}