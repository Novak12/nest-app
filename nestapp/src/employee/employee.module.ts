import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { Employee } from '../entities/employee.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [EmployeeService],
    controllers: [EmployeeController]
})
export class EmployeeModule {
  
}
