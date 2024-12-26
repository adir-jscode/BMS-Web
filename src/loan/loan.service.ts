import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { Account } from 'src/account/account.entity';
import { Customer } from 'src/customer/customer.entity';
import { CreateLoanDto } from './dto/create-loan-dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createLoan(dto: CreateLoanDto): Promise<Loan> {
    const account = await this.accountRepository.findOne({ where: { id: dto.accountId } });
    const customer = await this.customerRepository.findOne({ where: { id: dto.customerId } });

    if (!account || !customer) {
      throw new NotFoundException('Account or Customer not found');
    }

    const loan = this.loanRepository.create({
      ...dto,
      account,
      customer,
      balance: dto.amount,
    });

    return this.loanRepository.save(loan);
  }

  async getLoans(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['account', 'customer'] });
  }

  async getLoanById(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id }, relations: ['account', 'customer'] });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  async repayLoan(id: number, amount: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id } });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    loan.balance -= amount;

    if (loan.balance <= 0) {
      loan.isActive = false;
    }

    return this.loanRepository.save(loan);
  }
}
