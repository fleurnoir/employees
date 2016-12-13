import { Employee } from './models/employee';
import { Department, Position, Company } from './models/named-entity';
import { EmployeeService } from './employee.service';
import { Http } from '@angular/http';

enum Positions {
  Surgeon = 1,
  Physician,
  Head,
  Principal
}

enum Departments {
  Diagnostics = 1,
  Surgery,
  Emergency
}

export const EMPLOYEES: Employee[] =
  [
    new Employee({ id: 1, firstName: 'Remi', lastName: 'Headley', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Diagnostics, chiefId: 7, email: 'headley@princeton.com' }),
    new Employee({ id: 2, firstName: 'Alison', lastName: 'Cameron', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Diagnostics, chiefId: 7, email: 'cameron@princeton.com' }),
    new Employee({ id: 3, firstName: 'Robert', lastName: 'Chase', companyId: 1, positionId: Positions.Surgeon, departmentId: Departments.Surgery, chiefId: 9, email: 'chase@princeton.com' }),
    new Employee({ id: 4, firstName: 'Eric', lastName: 'Foreman', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Diagnostics, chiefId: 7, email: 'foreman@princeton.com' }),
    new Employee({ id: 5, firstName: 'Chris', lastName: 'Taub', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Diagnostics, chiefId: 7, email: 'taub@princeton.com' }),
    new Employee({ id: 6, firstName: 'Amber', lastName: 'Volakis', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Emergency, chiefId: 12, email: 'amber@princeton.com' }),
    new Employee({ id: 7, firstName: 'Gregory', lastName: 'House', companyId: 1, positionId: Positions.Head, departmentId: Departments.Diagnostics, chiefId: 10, email: 'gregy@princeton.com' }),
    new Employee({ id: 8, firstName: 'Martha', lastName: 'Masters', companyId: 1, positionId: Positions.Physician, departmentId: Departments.Emergency, chiefId: 12, email: 'masters@princeton.com' }),
    new Employee({ id: 9, firstName: 'James', lastName: 'Wilson', companyId: 1, positionId: Positions.Head, departmentId: Departments.Surgery, chiefId: 10, email: 'wilson@princeton.com' }),
    new Employee({ id: 10, firstName: 'Lisa', lastName: 'Cuddy', companyId: 1, positionId: Positions.Principal, departmentId: null, chiefId: null, email: 'cuddy@princeton.com' }),
    new Employee({ id: 11, firstName: 'Lawrence', lastName: 'Kutner', companyId: 1, positionId: Positions.Surgeon, departmentId: Departments.Emergency, chiefId: 12, email: 'kutner@princeton.com' }),
    new Employee({ id: 12, firstName: 'John', lastName: 'Doe', companyId: 1, positionId: Positions.Head, departmentId: Departments.Emergency, chiefId: 10, email: 'doe@princeton.com' })
  ];

export const DEPARTMENTS: Department[] = [
  new Department({ id: Departments.Diagnostics, name: 'Diagnostics Department'}),
  new Department({ id: Departments.Surgery, name: 'Surgery Department'}),
  new Department({ id: Departments.Emergency, name: 'Emergency Room'})
];

export const COMPANIES: Company[] = [new Company({ id: 1, name: 'Princeton-Plainsboro'})];

export const POSITIONS: Position[] = [
  new Position({ id: Positions.Surgeon, name: 'Surgeon'}),
  new Position({ id: Positions.Physician, name: 'Physician'}),
  new Position({ id: Positions.Head, name: 'Head of Department'}),
  new Position({ id: Positions.Principal, name: 'Hospital Principal'})
];

export class MockEmployeeService implements EmployeeService {

  constructor(/*private http: Http*/) { }

  searchEmployees(searchString: string): Promise<Employee[]> {
    return Promise.resolve(
      EMPLOYEES.filter(employee => {
        if(!searchString)
          return [];
        let name = `${employee.firstName} ${employee.lastName}`;
        return searchString && name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
      }
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
    return Promise.resolve(EMPLOYEES.find(e => e.id === id));
  }

} 