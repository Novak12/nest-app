import { Get, Controller,Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from 'entities/employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    root():string{
        return this.employeeService.root();
    }

    @Get('findOne/:name')
    async findOne(@Param() params):Promise<Employee>{
        console.log(params.name);
        return this.employeeService.findOne(params.name);
    }

    @Get('create')
    async create():Promise<string>{
        return this.employeeService.create();
    }

    @Get('edit')
    async edit():Promise<any>{
         return this.employeeService.edit();
    }

    @Get('edit2')
    async edit2():Promise<any>{
        return this.employeeService.editUseQueryRunner();
    }
}