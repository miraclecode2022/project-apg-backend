import { Repository, EntityRepository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployee } from './dto/create-employee.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Employee)
export class EmplpyeeRepository extends Repository<Employee> {
  async getEmployees(): Promise<Employee[]> {
    try {
      return await (await Employee.find()).sort();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createEmployee(createEmployeeDTO: CreateEmployee): Promise<Employee> {
    const { name, dayOfBirth, department } = createEmployeeDTO;

    // const maxId = await Employee.query(`SELECT MAX(id) FROM employee`);
    const query = this.createQueryBuilder('employee');
    query.select('MAX(employee.id)', 'max');

    const maxId = await query.getRawOne();

    const employee = new Employee();

    employee.code = 'NV' + (maxId.max != null ? maxId.max + 1 : 1).toString();
    employee.name = name;
    employee.dayOfBirth = dayOfBirth;
    employee.department = department;

    try {
      await employee.save();
      return employee;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateEmployee(
    id: number,
    createEmployeeDTO: CreateEmployee,
  ): Promise<any> {
    const { name, dayOfBirth, department } = createEmployeeDTO;

    try {
      await Employee.update(id, { name, dayOfBirth, department });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
