import { Get, Controller,Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from 'entities/employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    root():string{
        console.log(123)
        return this.employeeService.root();
    }

    @Get('findOne/:name')
    async findOne(@Param() params):Promise<Employee>{
        console.log(params.name);
        return this.employeeService.findOne(params.name);
    }

    @Get('create')
    async create():Promise<string>{
        console.log('1323')
        return this.employeeService.create();
    }
}