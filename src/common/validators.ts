import { IsString, MaxLength, IsNotEmpty, IsInt, IsIn, Validate, Matches, IsArray, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, IsOptional, IsNumber } from 'class-validator';

export class ConditionsValidator {

}

export class QueryValidator {
  conditions: any;

  @IsInt()
  limit: number;

  @IsInt()
  skip: number;
}