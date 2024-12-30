import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TransactionModule } from 'src/transaction/transaction.module';
import { CustomerModule } from 'src/customer/customer.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TransactionModule,CustomerModule,MailerModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
