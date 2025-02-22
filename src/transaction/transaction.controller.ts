import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  async getTransactions() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
  async getTransactionById(@Param('id') id: number) {
    return this.transactionService.getTransactionById(id);
  }
}
