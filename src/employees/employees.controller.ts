import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { LogsService } from 'src/logs/logs.service';

@Controller('employee')
export class EmployeesController {
    constructor(private employeeService : EmployeesService,private logService:LogsService) {}

    @Get("employees")
    async getEmployees() {
        try {
            return await this.employeeService.findAll();
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get("employees/:id")
    async getEmployee(id: number) {
       try {
            return await this.employeeService.findOne(id);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Put("update/:id")
    async updateEmployee(@Param("id") id: number, 
    @Body() employee: Employee) {
        try {
            const updatedEmployee = await this.employeeService.updateEmployee(id, employee);
            const log = {
                id: Math.floor(Math.random() * 1000),
                userId: updatedEmployee.id,
                action: 'update',
                actorType: 'employee',
                actorId: updatedEmployee.id,
                targetId : updatedEmployee.id,
                timestamp: new Date()
            };
            await this.logService.createLog(log);
            return updatedEmployee;
        }
        catch (error) {
            console.log(error);
        }
    }

    //delete employee
    @Delete("delete/:id")
    async deleteEmployee(@Param("id") id: number) {
        try {
            const employee = await this.employeeService.findOne(id);
            await this.employeeService.removeEmployee(id);
            const log = {
                id: Math.floor(Math.random() * 1000),
                userId: employee.id,
                action: 'delete',
                actorType: 'employee',
                actorId: employee.id,
                targetId : employee.id,
                timestamp: new Date()
            };
            await this.logService.createLog(log);
            return employee;
        }
        catch (error) {
            console.log(error);
        }
    }
}
