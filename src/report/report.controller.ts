import { Controller, Get, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('reports')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get('transactions')
  async generateTransactionReport(@Res() res): Promise<void> {
    const transactions = await this.transactionService.getTransactions(); // Fetch all transactions
    await this.reportService.generateTransactionReport(transactions, res);
  }
}
