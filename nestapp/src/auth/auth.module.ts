import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Employee } from '../entities/employee.entity'


@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {

}