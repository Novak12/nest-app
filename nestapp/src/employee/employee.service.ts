import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { Company } from '../entities/company.entity'
import * as crypto from 'crypto-js'

@Injectable()
export class EmployeeService {

    constructor( @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>) { }
    root(): string {
        return 'Hello World!';
    }
    async create(): Promise<string> {
        let employee = new Employee();
        let company = new Company();
        company.name = 'asc';
        employee.name = 'novak';
        employee.password = crypto.MD5('123').toString();
        employee.age = 20;
        employee.address = 'shanghai';
        employee.company = company;

        console.log(employee.password);

        return this.employeeRepository.save(employee)
            .then(res => {
                return 'create employee ...done'
            })
            .catch(err => {
                return err
            });
    }

    async findOne(name: string): Promise<Employee> {
        return await this.employeeRepository.findOne({ name: name });
    }

    //可以在事务中指定隔离级别
    async edit(): Promise<string> {
        let employee = await this.employeeRepository.findOne({ name: "novak" });
        if (!employee) {
            return getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.update<Employee>('age', '123', { age: 25 });
                await transactionalEntityManager.delete<Company>('company', { name: "wuhan" });
            }).then(res => {
                return 'tranction done'
            }).catch(Error => {
                return 'tranction failed, ' + Error;
            })
        } else {
            return 'employee not found';
        }
    }

    async editUseQueryRunner(): Promise<string> {
        let employee = await this.employeeRepository.findOne({ name: "novak" });
        if (!employee) {
            const connection = getConnection();
            const queryRunner = connection.createQueryRunner();
            await queryRunner.connect();
            employee.age=22;

            await queryRunner.startTransaction();
            try{
                await queryRunner.manager.update<Employee>('age', '123', { age: 25 });
                await queryRunner.manager.delete<Company>('company', { name: "wuhan" });  
                await queryRunner.commitTransaction();   
                return 'transaction done'           
            }catch(err){
                await queryRunner.rollbackTransaction();
                return 'transaction failed'
            }
        }else{
            return 'employee not found'
        }
    }
}