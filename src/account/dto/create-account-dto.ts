import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  accountType: string; 

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  initialDeposit: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
