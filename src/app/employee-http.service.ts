import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';
import { Department, Position, Company, INamedEntity } from './models/named-entity';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

interface NamedEntityConstructor<T extends INamedEntity> {
  new (obj: INamedEntity): T
}

@Injectable()
export class EmployeeHttpService implements EmployeeService {

  constructor(private http: Http) { }

  private getNamedEntity<T extends INamedEntity>(name: string, id: number, c: NamedEntityConstructor<T>): Observable<T> {
    return this.request<T>(name, id, item => new c(item));
  }

  private request<T>(name: string, param: any, factory: (result: any) => T): Observable<T> {
    let source = this.http.get(`/api/employees/${name}/${param}`);
    return new Observable<T>(subscriber=>{
      source.subscribe((response)=>{
        let result = response.json();
        if(result.error)
          subscriber.error(result.error);
        subscriber.next(result);
        subscriber.complete();
      });
      source.catch(error => subscriber.error(error));
    });
  }

  searchEmployees(searchString: string): Observable<Employee[]> {
    return this.request('search', searchString, result=>(<any[]>result).map(item=>new Employee(item)));
  }

  getDepartment(id: number): Observable<Department> {
    return this.getNamedEntity<Department>('department', id, Department);
  }

  getPosition(id: number): Observable<Position> {
    return this.getNamedEntity<Position>('position', id, Position);
  }

  getCompany(id: number): Observable<Company> {
    return this.getNamedEntity<Company>('company', id, Company);
  }

  getSubordinatesCount(chiefId: number): Observable<number> {
    return this.request('subcount', chiefId, result=>+result);
  }

  getSubordinates(chiefId: number): Observable<Employee[]> {
    return this.request('subordinates', chiefId, (result:any[])=>result.map(item=>new Employee(item))) 
  }

  getEmployee(id: number): Observable<Employee> {
    return this.request('employee', id, item=>new Employee(item));
  }

  getPhotoUrl(employeeId: number) {
    return `api/employees/photo/${employeeId}`;
  }
}

