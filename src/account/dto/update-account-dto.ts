import { IsOptional, IsBoolean, IsString, IsPositive, IsNumber } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  accountType?: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
