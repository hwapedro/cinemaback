import { IsString, IsNotEmpty, Matches, IsMongoId, IsInt, IsArray, ArrayNotEmpty, ArrayMaxSize, ArrayMinSize, Min } from 'class-validator';

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
}

export class OrderedItemValidator {
  @IsMongoId()
  item: string;

  @IsInt()
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