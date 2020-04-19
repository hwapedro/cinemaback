import { IsArray, IsString, IsMongoId, IsNumber, IsNotEmpty, IsDateString, IsDate, ArrayMinSize, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class CreateShowtimeValidator {
  @IsDateString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  hall: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  film: string;
}

export class CreateManyShowtimesValidator {
  @IsArray()
  @Type(() => CreateShowtimeValidator)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  showtimes: CreateShowtimeValidator[];
}