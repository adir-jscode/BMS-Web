import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan-dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  createLoan(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.createLoan(createLoanDto);
  }

  @Get()
  getLoans() {
    return this.loanService.getLoans();
  }

  @Get(':id')
  getLoanById(@Param('id') id: number) {
    return this.loanService.getLoanById(id);
  }

  @Patch(':id/repay')
  repayLoan(@Param('id') id: number, @Body('amount') amount: number) {
    return this.loanService.repayLoan(id, amount);
  }
}
