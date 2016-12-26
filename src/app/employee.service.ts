import { Injectable } from '@angular/core';
import { Employee } from './models/employee';
import { Department, Company, Position } from './models/named-entity';
import { Observable } from 'rxjs';

@Injectable()
export abstract class EmployeeService {
  abstract searchEmployees(searchString: string): Observable<Employee[]>;
  abstract getDepartment(id: number): Observable<Department>;
  abstract getPosition(id: number): Observable<Position>;
  abstract getCompany(id: number): Observable<Company>;
  abstract getSubordinatesCount(chiefId: number): Observable<number>;
  abstract getSubordinates(chiefId: number): Observable<Employee[]>;
  abstract getEmployee(id: number): Observable<Employee>;
  abstract getPhotoUrl(employeeId: number): string;
}