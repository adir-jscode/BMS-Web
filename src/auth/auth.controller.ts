import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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
            
            const createUser = await this.userService.create(userDTO);
            console.log("User created " + createUser);
            console.log("hited");
            const sendOtp = await this.authService.sendOtpEmail(userDTO.email);
            console.log("OTP Sent = "+ sendOtp);
            console.log(`User created successfully, email sent to ${userDTO.email} `);
            return { message: 'OTP sent to your email. Please verify your email.' };
        } 
        catch (error) {
            return error;
        }
       
    }

    @Post("login")
    async login(@Body() loginDTO: LoginDto, @Res() res: Response) {
    try {
        console.log("hited route");

        const token = await this.authService.login(loginDTO);
        console.log("token", token);

        res.cookie('token', token.accessToken, { httpOnly: true });

        return res.status(200).json({ message: "Login successful", accessToken: token.accessToken });
    } 
    catch (error) {
        console.error("Login error:", error);

        return res.status(401).json({ message: "Invalid credentials", error: error.message });
    }
}


@Get("logout")
async logout(@Res() res: Response) {
  try {
    res.clearCookie("token", { httpOnly: true, path: "/" }); // Clears cookie
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed:",error: error.message });
  }
}

@Post('verify-otp')
async verifyOtp(@Body() { email, otp }: { email: string, otp: string }) {
  try {
    const isValid = await this.authService.verifyOtp(email, otp);
    if (isValid) {
    console.log(email);
    await this.userService.update(email, { isVerified: true });
    console.log(this.userService.update(email, { isVerified: true }));

    return { message: 'OTP verified successfully.' };
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
