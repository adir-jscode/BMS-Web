import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';  
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @Inject(forwardRef(() => AccountService)) 
    private accountService: AccountService,
    private mailerService: MailerService,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
  const account = await this.accountService.getAccountByAccountNumber(dto.accountNumber);

  if (!account) {
    throw new NotFoundException('Account not found');
  }

  if (dto.type === 'deposit') {
    const oldBalance = Number(account.balance);
    const newBalance = oldBalance + dto.amount;
    await this.accountService.updateBalance(account.id, newBalance);

    // Refresh the account to get the updated balance
    account.balance = newBalance;
  } else {
    if (account.balance < dto.amount) {
      throw new NotFoundException('Insufficient balance');
    }

    const newBalance = account.balance - dto.amount;
    await this.accountService.updateBalance(account.id, newBalance);

    // Refresh the account to get the updated balance
    account.balance = newBalance;
  }

  const transaction = this.transactionRepository.create({
    ...dto,
    account,
  });

  // Send email
  await this.mailerService.sendMail({
    to: account?.customer?.email,
    subject: 'Transaction Notification',
    text: 'Good Morning',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #2E2F5B;
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
          }
          .content h2 {
            color: #505581;
          }
          .footer {
            background-color: #f4f4f4;
            color: #666666;
            text-align: center;
            padding: 10px;
            font-size: 12px;
          }
          .footer a {
            color: #505581;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Transaction Notification</h1>
          </div>
          <div class="content">
            <h2>Dear ${account.customer.lastName},</h2>
            <p>We are pleased to inform you that your account has been updated successfully.</p>
            <p><strong>Transaction Details:</strong></p>
            <ul>
              <li><strong>Account Number:</strong> ${account.accountNumber}</li>
              <li><strong>Transaction Type:</strong> ${dto.type}</li>
              <li><strong>Amount:</strong> ${dto.amount} BDT</li>
              <li><strong>Available Balance:</strong> ${account.balance} BDT </li>
            </ul>
            <p>Thank you for banking with us.</p>
          </div>
          <div class="footer">
            <p>Bank Management System &copy; 2024. All rights reserved.</p>
            <p>
              For any queries, contact us at 
              <a href="mailto:support@bank.com">support@bank.com</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  });

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

  //getTransactionsByAccountNumber
  async getTransactionsByAccountNumber(accountNumber: string): Promise<Transaction[]> {
  return await this.transactionRepository.find({
    where: { account: { accountNumber } }, // Ensure the nested `account` property is correct
    relations: ['account'], // Load the `account` relationship
  });
}

}
