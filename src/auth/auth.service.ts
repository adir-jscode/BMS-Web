import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login-dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
    private otpStore = new Map<string, { otp: string; expiresAt: number }>();
constructor(private userService: UserService,private jwtService: JwtService,private mailerService:MailerService) {}

    async login(loginDTO: LoginDto): Promise<{ accessToken: string }>  {
        const user = await this.userService.getByUniqueId(loginDTO.uniqueId); 
        const passwordMatched = await bcrypt.compare(loginDTO.password,user.password);
        if (passwordMatched) 
        {
            delete user.password;
            const response = {uniqueId : user.uniqueId, id: user.id};
            return {
                accessToken: this.jwtService.sign(response)
            };
        } 
        else 
        {
            throw new UnauthorizedException("Password does not match"); 
        }

    }

    async validateUser(payload: any) {
        return await this.userService.getByUniqueId(payload.uniqueId);
    }
    //logout with manipulating the token
    async logout() {
        this.jwtService.sign({uniqueId: null, id: null});
        return "Logged out successfully";
    }

     async sendOtpEmail(userEmail: string) {
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration time (e.g., 5 minutes)
    this.otpStore.set(userEmail, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // Send OTP email
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Your OTP for Registration',
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    });

    return otp;
  }

  async verifyOtp(userEmail: string, otp: string) {
    const otpData = this.otpStore.get(userEmail);

    if (!otpData) {
      throw new Error('OTP not found or expired.');
    }

    if (otpData.expiresAt < Date.now()) {
      this.otpStore.delete(userEmail);
      throw new Error('OTP has expired.');
    }

    if (otp !== otpData.otp) {
      throw new Error('Invalid OTP.');
    }

    this.otpStore.delete(userEmail); // Delete OTP after successful verification
    return true;
  }
}