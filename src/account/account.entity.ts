import { Customer } from 'src/customer/customer.entity';
import { Loan } from 'src/loan/loan.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountNumber: string;

  @Column()
  accountType: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0.0 })
  balance: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Customer, (customer) => customer.accounts, { onDelete: 'CASCADE' })
  customer: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.account, { cascade: true })
  transactions: Transaction[];

  @OneToMany(() => Loan, (loan) => loan.account, { cascade: true })
  loans: Loan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
