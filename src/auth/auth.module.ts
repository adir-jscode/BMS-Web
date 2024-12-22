import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LogsModule } from 'src/logs/logs.module';
import { EmployeesModule } from 'src/employees/employees.module';
@Module({
  imports: [UsersModule,LogsModule,EmployeesModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
