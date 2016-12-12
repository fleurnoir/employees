import { EMPLOYEES, DEPARTMENTS, POSITIONS, COMPANIES } from './mock-data';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';
import { Department } from './models/department';
import { Position } from './models/position';
import { Company } from './models/company';
import 'rxjs/add/operator/toPromise';

interface NamedEntity {
  id: number;
  name: string;
}

interface NamedEntityConstructor<T extends NamedEntity> {
  new (id: number, name: string): T
}


@Injectable()
export class EmployeeHttpService implements EmployeeService {

  constructor(private http: Http) { }

  private getNamedEntity<T extends NamedEntity>(name: string, id: number, c: NamedEntityConstructor<T>): Promise<T> {
    return this.request<T>(name, id, item => new c(item.id, item.name));
  }

  private request<T>(name: string, id: number, factory: (result: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get(`/api/employees/${name}/${id}`).toPromise().then(response => {
        var result = response.json();
        if (result['error'])
          reject(result['error']);
        resolve(factory(result));
      }).catch(err => reject(err));
    });
  }

  searchEmployees(searchString: string): Promise<Employee[]> {
    return Promise.resolve(
      EMPLOYEES.filter(employee =>
        searchString && employee.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
      ));
  }

  getDepartment(id: number): Promise<Department> {
    return this.getNamedEntity<Department>('department', id, Department);
  }

  getPosition(id: number): Promise<Position> {
    return this.getNamedEntity<Position>('position', id, Position);
  }

  getCompany(id: number): Promise<Company> {
    return this.getNamedEntity<Company>('company', id, Company);
  }

  getSubordinatesCount(chiefId: number): Promise<number> {
    return this.getSubordinates(chiefId).then(employees => employees.length);
  }

  getSubordinates(chiefId: number): Promise<Employee[]> {
    return this.request('subordinates', chiefId, (result:any[])=>result.map(item=>EmployeeHttpService.createEmployee(item))) 
  }

  private static createEmployee(e: any): Employee {
    return new Employee(
      e.id,
      e.firstName,
      e.lastName,
      e.companyId,
      e.positionId,
      e.departmentId,
      e.chiefId,
      e.email,
      e.mobile,
      e.office
    );
  }

  getEmployee(id: number): Promise<Employee> {
    return this.request<Employee>('employee', id, EmployeeHttpService.createEmployee);
  }
}

