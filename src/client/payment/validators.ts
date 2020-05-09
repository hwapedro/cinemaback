import { IsString, IsNotEmpty, Matches, IsMongoId, IsInt, IsArray, ArrayNotEmpty, ArrayMaxSize, ArrayMinSize, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentSeat {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  row: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  cell: number;
}

export class StartPaymentValidator {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  showtimeId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  seats: PaymentSeat[];

  @IsArray()
  @ValidateNested()
  @Type(() => OrderedItemValidator)
  items: OrderedItemValidator[];
}

export class OrderedItemValidator {
  @IsMongoId()
  @IsNotEmpty()
  item: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}


export class SubmitPaymentValidator {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  showtimeId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  orderedItems: OrderedItemValidator[];

  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  cinemaId: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  blockId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}