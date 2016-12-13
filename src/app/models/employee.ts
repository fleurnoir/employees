export interface IEmployee {
  id: number; 
  firstName: string;
  lastName: string;
  companyId: number;
  positionId: number;
  departmentId: number;
  chiefId?: number;
  email?: string;
  mobile?: string;
  office?: string;
}

export class Employee implements IEmployee {
  id: number; 
  firstName: string;
  lastName: string;
  companyId: number;
  positionId: number;
  departmentId: number;
  chiefId?: number;
  email?: string;
  mobile?: string;
  office?: string;
  
  constructor(obj: IEmployee) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.companyId = obj.companyId;
    this.positionId = obj.positionId;
    this.departmentId = obj.departmentId;
    this.chiefId = obj.chiefId;
    this.email = obj.email;
    this.mobile = obj.mobile;
    this.office = obj.office;
  }
}