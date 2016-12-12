import { EmployeeService } from '../employee.service';
import { Department } from './department';
import { Position } from './position';
import { Company } from './company';

import { Lazy } from '../utils/lazy';

export class Employee {
  constructor(
    readonly id: number, 
    readonly firstName: string,
    readonly lastName: string,
    readonly companyId: number,
    readonly positionId: number,
    readonly departmentId: number,
    readonly chiefId?: number,
    readonly email?: string,
    readonly mobile?: string,
    readonly office?: string
    ) {}
  
  get name(): string { 
    return `${this.firstName} ${this.lastName}`; 
  }


}