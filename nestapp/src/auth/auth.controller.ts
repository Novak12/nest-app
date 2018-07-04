import { Get, Controller, Param, UseGuards } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../entities/employee.entity'
import { AuthGuard } from '@nestjs/passport';
import { callback } from './jwt.strategy'

export class AuthController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get('findOne/:name')
    @UseGuards(AuthGuard('jwt', { session: false, callback }))
    async findOne( @Param() params): Promise<Employee> {
        console.log(params.name);
        return this.employeeService.findOne(params.name);
    }
}