import { forwardRef, Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]),CustomerModule, forwardRef(() => TransactionModule),MailerModule],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {}
