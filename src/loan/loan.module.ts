import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { Account } from 'src/account/account.entity';
import { Customer } from 'src/customer/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan, Account, Customer]),
  ],
  providers: [LoanService],
  controllers: [LoanController],
  exports: [LoanService],
})
export class LoanModule {}
