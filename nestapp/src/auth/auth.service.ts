import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface'
import * as jwt from 'jsonwebtoken';
import { Employee } from '../entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    user: Employee
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>) { }

    async createToken(userName: string, passwoerd: string): Promise<any> {
        const user: JwtPayload = { userNmae: userName, passwoerd: passwoerd }
        return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
    }

    async validateUser(token: string): Promise<any> {
        console.log(token)
        return this.employeeRepository.findOne({ name: token });
    }

    async findEmployeeByName(name: string): Promise<Employee> {
        return this.employeeRepository.findOne({ name: name });
    }

    getUser(): Employee {
        return this.user;
    }

    async login(name: string, password: string): Promise<any> {
        this.user = await this.employeeRepository.findOne({ name: name });
        if (this.user != undefined && this.user.password == password) {
            return this.createToken(this.user.name, this.user.password);
        } else {
            return 'login failed !'
        }
    }
}