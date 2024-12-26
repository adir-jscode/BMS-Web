import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]),CustomerModule],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService]
})
export class AccountModule {}
