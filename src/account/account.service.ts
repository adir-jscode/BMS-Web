import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { Customer } from 'src/customer/customer.entity';
import { CreateAccountDto } from './dto/create-account-dto';
import { UpdateAccountDto } from './dto/update-account-dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const customer = await this.customerRepository.findOne({ where: { id: createAccountDto.customerId } });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const account = this.accountRepository.create({
      ...createAccountDto,
      balance: createAccountDto.initialDeposit,
      customer,
    });

    return this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async deactivate(id: number): Promise<Account> {
    const account = await this.findOne(id);
    account.isActive = false;
    return this.accountRepository.save(account);
  }

  async activate(id: number): Promise<Account> {
    const account = await this.findOne(id);
    account.isActive = true;
    return this.accountRepository.save(account);
  }
}
