import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  password: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string; 
  //default value is false & it will be set to true when user verifies his email
  @Column({ default: false })
  isVerified: boolean; 
}
