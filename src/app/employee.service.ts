import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Department } from './models/department';
import { Company } from './models/company';
import { Position } from './models/position';
//import 'rxjs/add/operator/toPromise';
//export const EMPLOYEE_SERVICE = 'EmployeeService';

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