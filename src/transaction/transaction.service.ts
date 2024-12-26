import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';  

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @Inject(forwardRef(() => AccountService)) 
    private accountService: AccountService,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const account = await this.accountService.findOne(dto.accountId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const transaction = this.transactionRepository.create({
      ...dto,
      account,
    });

    
    if (dto.type === 'deposit') 
    {
      account.balance += dto.amount;
      await this.accountService.updateBalance(account.id, account.balance);
    } 
    else 
    {
      
      if (account.balance < dto.amount) {
        throw new NotFoundException('Insufficient balance');
      }
      account.balance -= dto.amount;
      await this.accountService.updateBalance(account.id, account.balance);
    }
    

    return this.transactionRepository.save(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find({ relations: ['account'] });
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
