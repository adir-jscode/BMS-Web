import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>) {}

        async create(userDTO: CreateUserDto): Promise<User> {
            const salt = await bcrypt.genSalt(10);
            userDTO.password = await bcrypt.hash(userDTO.password, salt);
            const user = await this.userRepository.save(userDTO);
            return user;
        }

        async getAll(): Promise<User[]> {
            return await this.userRepository.find();
        }

        async getByUniqueId(uniqueId: any): Promise<User> {
            return await this.userRepository.findOne({ where: { uniqueId } });
        }

        
        async update(email: string, update: Partial<User>) {
        
              const user = await this.userRepository.findOne({ where: { email } });
                if (!user) {
                    return null;
                }
                Object.assign(user, update);
                return await this.userRepository.save(user);
        }

       
        async getProfile(uniqueId: string) {
            return await this.userRepository.findOne({ where: { uniqueId } });
        }
        
}
