import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {EmployeeModule} from './employee/employee.module'
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EmployeeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
