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

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}