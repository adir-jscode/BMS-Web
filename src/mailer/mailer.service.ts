import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
@Injectable()
export class MailerService {
    constructor(private configService:ConfigService) {}
    emailTransport(){
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<string>('EMAIL_PORT'),
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
                secure: false,
            },
        });
        return transporter;
    }

    async sendMails(EmailDto : EmailDto){
        const {subject, text, html} = EmailDto;
        console.log(EmailDto.recipient);
        const transporter = this.emailTransport();
        const options : nodemailer.SendMailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: EmailDto.recipient,
            subject: subject,
            text: text,
            html: html,
        }
        console.log(this.configService.get<string>('EMAIL_USER'));
        try{
            await transporter.sendMail( options );  
            console.log('Email sent successfully');
        }
        catch(error){
            console.error('Error occurred while sending email', error);
        }
    }
}
