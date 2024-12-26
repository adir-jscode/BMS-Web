import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EmailDto } from './dto/email.dto';

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService:MailerService) {}

    @Post("send")
    async sendMail(@Body() EmailDto : EmailDto) {
        try {
            await this.mailerService.sendMails(EmailDto);
            return { message: 'Email sent successfully' };
        } 
        catch (error) {
            return error;
        }
    }
}
