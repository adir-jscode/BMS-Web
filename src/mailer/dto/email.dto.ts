import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailDto {
    @IsEmail({}, { each: true })
    @IsNotEmpty()
    recipient: string[];

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    html: string;

    @IsOptional()
    @IsString()
    text?: string;
}