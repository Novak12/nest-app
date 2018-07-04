import { Get, Controller, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Employee } from '../entities/employee.entity'
import { AuthGuard } from '@nestjs/passport';
import { callback } from './jwt.strategy'

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('findOne/:name')
    @UseGuards(AuthGuard('jwt', { session: false, callback }))
    async findOne( @Param() params): Promise<Employee> {
        console.log(params.name);
        return this.authService.findEmployeeByName(params.name);
    }

    @Get('login')
    async login( @Param() params): Promise<any> {
        return this.authService.login(params.userName, params.password);
    }
}