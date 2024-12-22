import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("users")    // This is the name of the table in the database
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    dateOfBirth: Date;

    @Column({ default: true })
    isActive: boolean;

    
}