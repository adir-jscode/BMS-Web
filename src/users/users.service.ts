import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {}

    async createUser(user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}});
    }
}
