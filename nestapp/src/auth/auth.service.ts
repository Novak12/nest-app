import { Injectable } from '@nestjs/common'
import { EmployeeService } from '../employee/employee.service'
import { JwtPayload } from './jwt-payload.interface'
import * as jwt from 'jsonwebtoken';
import { Employee } from '../entities/employee.entity'

@Injectable()
export class AuthService {
    constructor(private readonly employeeService: EmployeeService) { }

    async createToken(userName: string, passwoerd: string): Promise<any> {
        const user: JwtPayload = { userNmae: userName, passwoerd: passwoerd }
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(token: string): Promise<any> {
        return this.employeeService.findOne(token);
    }

    async findEmployeeByName(name: string): Promise<Employee> {
        return this.employeeService.findOne(name);
    }

    async login(name: string, password: string): Promise<any> {
        let user = await this.employeeService.findOne(name);
        if (user != undefined && user.password == password) {
            return this.createToken(user.name, user.password);
        }else{
            return 'login failed !'
        }
    }
}