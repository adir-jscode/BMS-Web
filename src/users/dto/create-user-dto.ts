import { IsEmail, IsNotEmpty, IsString, IsDate, IsPhoneNumber } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsDate()
    dateOfBirth: Date;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber(null)
    phoneNumber: string;
}