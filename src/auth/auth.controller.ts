import { Body, Controller, Get, Post } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private userService : UsersService,
        private logService: LogsService
    ) {}

    @Post('register')
    async register(@Body() user: CreateUserDto) {
        try {
            
            const newUser = await this.userService.createUser(user);
            const log = {
                    id: Math.floor(Math.random() * 1000),
                    userId: newUser.id,
                    action: 'register',
                    actorType: 'user',
                    actorId: newUser.id,
                    targetId : newUser.id,
                    timestamp: new Date()
                };
            await this.logService.createLog(log);
            return newUser;

        } catch (error) {
            return error;
        }
    }

    @Get('login')
    async login(@Body() user: CreateUserDto) {
        try {
            const foundUser = await this.userService.findByEmail(user.email);
            if (foundUser && foundUser.password === user.password) {
                const log = {
                    id: Math.floor(Math.random() * 1000),
                    userId: foundUser.id,
                    action: 'login',
                    actorType: 'user',
                    actorId: foundUser.id,
                    targetId : foundUser.id,
                    timestamp: new Date()
                };
                await this.logService.createLog(log);
                return foundUser;
            }
            return 'User not found';
        } catch (error) {
            return error;
        }
    }

    //get all users
    @Get('users')
    async getUsers() {
        try {
            return await this.userService.findAll();
        } catch (error) {
            return error;
        }
    }
}
