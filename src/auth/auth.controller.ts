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
            console.log("hited");
            const sendOtp = await this.authService.sendOtpEmail(userDTO.email);
            console.log("OTP Sent = "+ sendOtp);
            const createUser = await this.userService.create(userDTO);
            console.log("User created " + createUser);
             console.log(`User created successfully, email sent to ${userDTO.email} `);
             return { message: 'OTP sent to your email. Please verify your email.' };
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

@Post('verify-otp')
async verifyOtp(@Body() { email, otp }: { email: string, otp: string }) {
  try {
    const isValid = await this.authService.verifyOtp(email, otp);
    if (isValid) {
      return { message: 'OTP verified successfully. Proceed with registration.' };
    }
  } catch (error) {
    return { error: error.message };
  }
}

//get all users
@Get('users')
async getUsers() {
    try {
        return await this.userService.getAll();
    } 
    catch (error) {
        return error;
    }


    
}
}
