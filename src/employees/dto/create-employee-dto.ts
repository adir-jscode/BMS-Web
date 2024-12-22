import { IsString, IsEmail, IsPhoneNumber, IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsDate()
  hireDate: Date;
}
