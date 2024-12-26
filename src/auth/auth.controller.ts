import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,private authService:AuthService) {}

    @Post('signup')
    async signup(@Body() userDTO : CreateUserDto) {
        try {
            return await this.userService.create(userDTO);
        } 
        catch (error) {
            return error;
        }
       
    }

    @Get("login")
    async login(@Body() loginDTO: LoginDto ) {
        try {
            return await this.authService.login(loginDTO);
        } 
        catch (error) {
            return error;
        }
    }

    @Get("logout")
    async logout() {
        try {
            return await this.authService.logout();
        } 
        catch (error) {
            return error;
        }
    }

    
}
