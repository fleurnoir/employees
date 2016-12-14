import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';
import { Department, Position, Company, INamedEntity } from './models/named-entity';
import 'rxjs/add/operator/toPromise';

interface NamedEntityConstructor<T extends INamedEntity> {
  new (obj: INamedEntity): T
}


@Injectable()
export class EmployeeHttpService implements EmployeeService {

  constructor(private http: Http) { }

  private getNamedEntity<T extends INamedEntity>(name: string, id: number, c: NamedEntityConstructor<T>): Promise<T> {
    return this.request<T>(name, id, item => new c(item));
  }

  private request<T>(name: string, param: any, factory: (result: any) => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get(`/api/employees/${name}/${param}`).toPromise().then(response => {
        var result = response.json();
        if (result['error'])
          reject(result['error']);
        resolve(factory(result));
      }).catch(err => reject(err));
    });
  }

  searchEmployees(searchString: string): Promise<Employee[]> {
    return this.request('search', searchString, result=>(<any[]>result).map(item=>new Employee(item)));
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
    return this.request('subcount', chiefId, result=>+result);
  }

  getSubordinates(chiefId: number): Promise<Employee[]> {
    return this.request('subordinates', chiefId, (result:any[])=>result.map(item=>new Employee(item))) 
  }

  getEmployee(id: number): Promise<Employee> {
    return this.request('employee', id, item=>new Employee(item));
  }
}

