import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is available for environment variables
    UserModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: 60 * 5, // 5 minutes
      },
    }),
    PassportModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'your_email@gmail.com', // Replace with your email
          pass: 'your_email_password', // Replace with your email password
        },
      },
      defaults: {
        from: '"No Reply" <your_email@gmail.com>', // Default sender email
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
