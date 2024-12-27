import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsString()
  loanType: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  interestRate: number;

  @IsNotEmpty()
  @Type(() => Date) // Ensures JSON strings are parsed as Date
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date) // Ensures JSON strings are parsed as Date
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}

