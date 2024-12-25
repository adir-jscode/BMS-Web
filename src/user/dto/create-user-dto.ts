import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    uniqueId: string;
    @IsString()
    name: string;
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    phone: string;
    @IsString()
    role: string;
    isVerified: boolean;
}