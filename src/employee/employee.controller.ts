import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployee } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getEmployees(): Promise<Employee[]> {
    return this.employeeService.getEmployees();
  }

  @Post()
  createEmployee(@Body() createEmployeeDTO: CreateEmployee): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeDTO);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEmployeeDTO: CreateEmployee,
  ) {
    return this.employeeService.updateEmployee(id, createEmployeeDTO);
  }
}
