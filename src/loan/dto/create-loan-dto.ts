import { IsDecimal, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsNotEmpty()
  @IsString()
  loanType: string;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDecimal()
  interestRate: number;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  accountId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
