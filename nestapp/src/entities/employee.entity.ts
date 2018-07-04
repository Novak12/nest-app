import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Company } from './company.entity'
@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    age: number

    @Column()
    address: string

    @ManyToOne(type => Company, company => company.employees, { cascade: true })
    @JoinTable()
    company: Company
}