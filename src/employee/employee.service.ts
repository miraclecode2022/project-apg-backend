import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmplpyeeRepository } from './employee.repository';
import { Employee } from './entities/employee.entity';
import { CreateEmployee } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmplpyeeRepository)
    private readonly employeeRepo: EmplpyeeRepository,
  ) {}

  async getEmployees(): Promise<Employee[]> {
    return this.employeeRepo.getEmployees();
  }

  async createEmployee(createEmployeeDTO: CreateEmployee): Promise<Employee> {
    return this.employeeRepo.createEmployee(createEmployeeDTO);
  }

  async updateEmployee(
    id: number,
    createEmployeeDTO: CreateEmployee,
  ): Promise<any> {
    return this.employeeRepo.updateEmployee(id, createEmployeeDTO);
  }
}
