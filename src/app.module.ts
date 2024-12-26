import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    CustomerModule,
    AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
