import { IsNotEmpty, IsDate, IsDateString, Allow } from "class-validator";

export class ReportGenerateValidator {
  @Allow()
  conditions: any;

  @Allow()
  skip: any;

  @Allow()
  limit: any;
}