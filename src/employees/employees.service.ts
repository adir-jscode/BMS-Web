import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
    constructor(
            @InjectRepository(Employee)
            private employeeRepository: Repository<Employee>) {}

            
async createEmployee(employee: Employee): Promise<Employee> {
    return this.employeeRepository.save(employee);
}

async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
}

async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({where: {id}});
}
//update
async updateEmployee(id: number, employee: Employee): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne({where: {id}});
}

async removeEmployee(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
}
}
