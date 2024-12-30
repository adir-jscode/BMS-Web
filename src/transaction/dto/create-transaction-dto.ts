import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  type: string; 

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  description?: string;
}
