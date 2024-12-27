import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './loan.entity';
import { Account } from 'src/account/account.entity';
import { Customer } from 'src/customer/customer.entity';
import { CreateLoanDto } from './dto/create-loan-dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private loanRepository: Repository<Loan>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private mailerService: MailerService
  ) {}

  async createLoan(dto: CreateLoanDto): Promise<Loan> {
    const account = await this.accountRepository.findOne({ where: { accountNumber: dto.accountNumber } });
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

    //send email to customer
    await this.mailerService.sendMails({
      recipient: [customer.email],
      subject: 'Loan Notification',
      text: 'Good Morning',
      html: `
        <!DOCTYPE html>
<html>
<head>
  <title>Loan Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #2e2f5b;
      color: #f4d35e;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .content p {
      margin: 10px 0;
    }
    .footer {
      background-color: #505581;
      color: #ffffff;
      text-align: center;
      padding: 10px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .footer p {
      margin: 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Loan Notification</h1>
    </div>
    <div class="content">
      <p>Dear Customer,</p>
      <p>Thank you for your loan application. We are pleased to inform you that your application has been received and is currently under review.</p>
      <p>You will be notified of the next steps shortly. If you have any questions, please do not hesitate to contact us.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Bank Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

      `,
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
