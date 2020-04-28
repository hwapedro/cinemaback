import { IsNotEmpty, IsDate, IsDateString } from "class-validator";

export class ReportGenerateValidator {
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsNotEmpty()
  @IsDateString()
  to: string;
}