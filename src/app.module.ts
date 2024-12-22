import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { EmployeesModule } from './employees/employees.module';
import { LogsModule } from './logs/logs.module';
import { Log } from './logs/logs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'BMS',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      entities: [
        User,
        Log
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EmployeesModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {
    console.log('DB:', datasource.driver.database);
  }
}
