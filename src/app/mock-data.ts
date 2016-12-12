import { Employee } from './models/employee';
import { Department } from './models/department';
import { Position } from './models/position';
import { Company } from './models/company';
import { EmployeeService } from './employee.service';
import { Http } from '@angular/http';

enum Positions {
  Surgeon=1,
  Physician,
  Head,
  Principal
}

enum Departments {
  Diagnostics=1,
  Surgery,
  Emergency
}

export const EMPLOYEES: Employee[] =
  [
    new Employee(1, 'Remi', 'Headley', 1, Positions.Physician, Departments.Diagnostics, 7, 'headley@princeton.com'),
    new Employee(2, 'Alison', 'Cameron', 1, Positions.Physician, Departments.Diagnostics, 7, 'cameron@princeton.com'),
    new Employee(3, 'Robert', 'Chase', 1, Positions.Surgeon, Departments.Surgery, 9, 'chase@princeton.com'),
    new Employee(4, 'Eric', 'Foreman', 1, Positions.Physician, Departments.Diagnostics, 7, 'foreman@princeton.com'),
    new Employee(5, 'Chris', 'Taub', 1, Positions.Physician, Departments.Diagnostics, 7, 'taub@princeton.com'),
    new Employee(6, 'Amber', 'Volakis', 1, Positions.Physician, Departments.Emergency, 12, 'amber@princeton.com'),
    new Employee(7, 'Gregory', 'House', 1, Positions.Head, Departments.Diagnostics, 10, 'gregy@princeton.com'),
    new Employee(8, 'Martha', 'Masters', 1, Positions.Physician, Departments.Emergency, 12, 'masters@princeton.com'),
    new Employee(9, 'James', 'Wilson', 1, Positions.Head, Departments.Surgery, 10, 'wilson@princeton.com'),
    new Employee(10, 'Lisa', 'Cuddy', 1, Positions.Principal, null, null, 'cuddy@princeton.com'),
    new Employee(11, 'Lawrence', 'Kutner', 1, Positions.Surgeon, Departments.Emergency, 12, 'kutner@princeton.com'),
    new Employee(12, 'John', 'Doe', 1, Positions.Head, Departments.Emergency, 10, 'doe@princeton.com')
  ];

export const DEPARTMENTS: Department[] = [
  new Department(Departments.Diagnostics, 'Diagnostics Department'),
  new Department(Departments.Surgery, 'Surgery Department'),
  new Department(Departments.Emergency, 'Emergency Room')
];

export const COMPANIES: Company[] = [new Company(1, 'Princeton-Plainsboro')];

export const POSITIONS: Position[] = [
  new Position(Positions.Surgeon, 'Surgeon'),
  new Position(Positions.Physician, 'Physician'),
  new Position(Positions.Head, 'Head of Department'),
  new Position(Positions.Principal, 'Hospital Principal')
];

export class MockEmployeeService implements EmployeeService {

  constructor(/*private http: Http*/) { }

  searchEmployees(searchString: string): Promise<Employee[]> {
    return Promise.resolve(
      EMPLOYEES.filter(employee =>
        searchString && employee.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
      ));
  }

  getDepartment(id: number): Promise<Department> {
    return Promise.resolve(DEPARTMENTS.find(d => d.id === id));
  }

  getPosition(id: number): Promise<Position> {
    return Promise.resolve(POSITIONS.find(p => p.id === id));
  }

  getCompany(id: number): Promise<Company> {
    return Promise.resolve(COMPANIES.find(c => c.id === id));
  }

  getSubordinatesCount(chiefId: number): Promise<number> {
    return this.getSubordinates(chiefId).then(employees => employees.length);
  }

  getSubordinates(chiefId: number): Promise<Employee[]> {
    return Promise.resolve(EMPLOYEES.filter(employee => employee.chiefId === chiefId));
  }

  getEmployee(id: number): Promise<Employee> {
    return Promise.resolve(EMPLOYEES.find(e=>e.id === id));
    // return new Promise<Employee>((resolve, reject) => {
    //   this.http.get(`/api/employees/employee/${id}`).toPromise().then(response => {
    //     var result = response.json();
    //     if (result['error'])
    //       reject(result['error']);
    //     var e = <Employee>result;
    //     resolve(new Employee(
    //       e.id,
    //       e.firstName,
    //       e.lastName,
    //       e.companyId,
    //       e.positionId,
    //       e.departmentId,
    //       e.chiefId,
    //       e.email,
    //       e.mobile,
    //       e.office
    //     ));
    //   }).catch(err => reject(err));
    // });
  }

} 