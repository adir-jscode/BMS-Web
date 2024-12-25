import { Module } from '@nestjs/common';;
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { PassportModule } from "@nestjs/passport";
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule,JwtModule.register({ secret: authConstants.secret,signOptions: { expiresIn: '1d' },}),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
