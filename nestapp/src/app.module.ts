import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {EmployeeModule} from './employee/employee.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(/* {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "nest-app",
      "entities": [],
      "synchronize": true
    } */),
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
