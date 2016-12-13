import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Department, Company, Position } from './models/named-entity';

@Injectable()
export abstract class EmployeeService {
  abstract searchEmployees(searchString: string): Promise<Employee[]>;
  abstract getDepartment(id: number): Promise<Department>;
  abstract getPosition(id: number): Promise<Position>;
  abstract getCompany(id: number): Promise<Company>;
  abstract getSubordinatesCount(chiefId: number): Promise<number>;
  abstract getSubordinates(chiefId: number): Promise<Employee[]>;
  abstract getEmployee(id: number): Promise<Employee>;
}