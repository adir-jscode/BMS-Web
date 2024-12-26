import { Customer } from 'src/customer/customer.entity';
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn 
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

  @CreateDateColumn()
  createdAt: Date; 

  @UpdateDateColumn()
  updatedAt: Date; 
}
