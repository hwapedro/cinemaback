import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class WithCinema {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  cinema: string;
}