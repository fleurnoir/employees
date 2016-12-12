import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee-details',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="employee">
      <h2>{{employee.name}}</h2>
      <p *ngIf="position">{{position}}</p>
      <p *ngIf="department">{{department}}</p>
      <p *ngIf="company">{{company}}</p>
      <p *ngIf="subordinatesCount"><a href="#" (click)="showSubordinates()"> <b>Subordinates:</b> {{subordinatesCount}}</a></p>
      <p *ngIf="chief"><a href="#" (click)="showChief()"><b>Chief:</b> {{chief.name}}</a></p>
    </div>
  `
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  loading: boolean;
  employee: Employee;
  position: string;
  department: string;
  company: string;
  chief: Employee;
  subordinatesCount: number;
  
  private subscription: Subscription;
  private input: string;

  constructor(
    private route: ActivatedRoute, 
    private service: EmployeeService, 
    private router: Router){}
  
  // private returnToSearch(): void {
  //   this.router.navigateByUrl(`search?input=${this.input}`);
  // }

  showSubordinates(): boolean {
    this.router.navigateByUrl(`search?input=${this.input}&chiefId=${this.employee.id}`);
    return false;
  }

  showChief(): boolean {
    if(this.chief)
      this.router.navigateByUrl(`details?input=${this.input}&id=${this.chief.id}`);
    return false;
  }
  
  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params=>{
      let id = params['id'];
      this.input = params['input'];
      if(id) {
        this.loading = true;
        this.service.getEmployee(+id).then(employee=>{
          this.loading = false;
          if(!employee)
            return;
            //this.returnToSearch();

          this.employee = employee;

          let error = e => console.log(e);

          this.service.getDepartment(employee.departmentId).then(d=>this.department = d && d.name).catch(error);
          this.service.getCompany(employee.companyId).then(c=>this.company = c && c.name).catch(error);
          this.service.getEmployee(employee.chiefId).then(c=>this.chief=c).catch(error);
          this.service.getPosition(employee.positionId).then(p=>this.position = p && p.name).catch(error);
          this.service.getSubordinatesCount(employee.id).then(c=>this.subordinatesCount=c).catch(error);

        }).catch(error=>{
          this.loading = false;
          console.log(error);
          //this.returnToSearch();
        });
      }  
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
