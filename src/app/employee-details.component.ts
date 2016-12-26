import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { Company, Department, Position } from './models/named-entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Subscription } from 'rxjs';
import { withLog } from './utils';

@Component({
  selector: 'employee-details',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="employee">
      <img src="{{photoUrl}}"/>
      <h2>{{employee.firstName}} {{employee.lastName}}</h2>
      <p *ngIf="position">{{position}}</p>
      <p *ngIf="department">{{department}}</p>
      <p *ngIf="company">{{company}}</p>
      <p *ngIf="employee.email"><b>E-mail:</b> <a href="mailto:{{employee.email}}">{{employee.email}}</a></p>
      <p *ngIf="subordinatesCount"><a href="#" (click)="showSubordinates()"> <b>Subordinates:</b> {{subordinatesCount}}</a></p>
      <p *ngIf="chief"><a href="#" (click)="showChief()"><b>Chief:</b> {{chief.firstName}} {{chief.lastName}}</a></p>
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
  photoUrl: string;

  private subscription: Subscription;
  private input: string;

  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private router: Router) { }

  showSubordinates(): boolean {
    this.router.navigateByUrl(`search?input=${this.input}&chiefId=${this.employee.id}`);
    return false;
  }

  showChief(): boolean {
    if (this.chief)
      this.router.navigateByUrl(`details?input=${this.input}&id=${this.chief.id}`);
    return false;
  }

  getPhotoUrl(): string {
    return this.service.getPhotoUrl(this.employee.id);
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      let id = params['id'];
      this.input = params['input'];
      if (id) {
        this.loading = true;
        this.employee = null;
        withLog(this.service.getEmployee(+id)).subscribe(employee => {

          if (!employee) {
            this.loading = false;
            return;
          }

          withLog(this.service.getDepartment(employee.departmentId)).subscribe(d=>this.department = d && d.name);
          withLog(this.service.getCompany(employee.companyId)).subscribe(c=>this.company = c && c.name);
          withLog(this.service.getEmployee(employee.chiefId)).subscribe(c=>this.chief = c);
          withLog(this.service.getPosition(employee.positionId)).subscribe(p=>this.position = p && p.name);
          withLog(this.service.getSubordinatesCount(employee.id)).subscribe(c=>this.subordinatesCount=c);

          this.employee = employee;
          this.photoUrl = this.service.getPhotoUrl(employee.id);
          this.loading = false;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



