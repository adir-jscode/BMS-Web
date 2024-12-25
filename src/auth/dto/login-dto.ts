import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  uniqueId: string;
 @IsNotEmpty()
  password: string;
}