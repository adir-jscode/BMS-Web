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
    
    async logout() {
        this.jwtService.sign({uniqueId: null, id: null});
        return "Logged out successfully";
    }

     async sendOtpEmail(userEmail: string) {
    
    const otp = crypto.randomInt(100000, 999999).toString();

   
    this.otpStore.set(userEmail, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await this.mailerService.sendMail({
  to: userEmail,
  subject: 'Your OTP for Registration',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP for Registration</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #2E2F5B;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          color: #333333;
          line-height: 1.6;
          text-align: center;
        }
        .content h2 {
          color: #505581;
          font-size: 20px;
        }
        .otp {
          font-size: 24px;
          color: #2E2F5B;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          background-color: #f4f4f4;
          color: #666666;
          text-align: center;
          padding: 10px;
          font-size: 12px;
        }
        .footer a {
          color: #505581;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Verification Code</h1>
        </div>
        <div class="content">
          <h2>Hello,</h2>
          <p>Use the following One-Time Password (OTP) to complete your registration process:</p>
          <div class="otp">${otp}</div>
          <p>Please note that this OTP will expire in 5 minutes.</p>
          <p>If you did not request this, please ignore this email or contact support.</p>
        </div>
        <div class="footer">
          <p>Bank Management System &copy; 2024. All rights reserved.</p>
          <p>
            Need help? Contact us at 
            <a href="mailto:support@bank.com">support@bank.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
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

    this.otpStore.delete(userEmail); 
    return true;
  }
}