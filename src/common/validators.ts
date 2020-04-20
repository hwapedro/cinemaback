import { IsString, MaxLength, IsNotEmpty, IsInt, IsIn, Validate, Matches, IsArray, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, IsOptional, IsNumber, Allow } from 'class-validator';

export class ConditionsValidator {

}

export class QueryValidator {
  @Allow()
  conditions: any;

  @IsInt()
  @IsOptional()
  limit: number;

  @IsInt()
  @IsOptional()
  skip: number;
}