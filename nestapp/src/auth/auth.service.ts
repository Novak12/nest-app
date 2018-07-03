import { Injectable } from '@nestjs/common'
import { EmployeeService } from '../employee/employee.service'
import { JwtPayload } from './jwt-payload.interface'
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly employeeService: EmployeeService) { }

    async createToken(userName: string, passwoerd: string) {
        const user: JwtPayload = { userNmae: userName, passwoerd: passwoerd }
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(token: string): Promise<any> {
        return await this.employeeService.findOne(token);
    }
}