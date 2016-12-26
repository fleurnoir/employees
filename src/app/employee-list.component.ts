import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeLinkView } from './models/employee-link-view';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { withLog } from './utils';

@Component({
  selector: 'employee-list',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div class="ui divided items" *ngIf="employees">
      <employee-link class="item" *ngFor="let employee of employees" [employee]="employee" (selected)="showDetails(employee)"></employee-link>
    </div>
  `,
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  loading: boolean;
  employees: EmployeeLinkView[];
  private input: string;
  private subscription: Subscription;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      this.input = params['input'];
      let chiefId = params['chiefId'];
      if (this.input || chiefId) {
        this.loading = true;
        this.employees = null;
        let request: (() => Observable<Employee[]>) = chiefId
          ? () => this.service.getSubordinates(+chiefId)
          : () => this.service.searchEmployees(this.input);

        withLog(request())
          .subscribe(employees => {
            
            if (!employees) {
              this.loading = false;
              return;
            }

            this.loading = false;

            this.employees = <EmployeeLinkView[]>[];
            for(let i=0; i<employees.length; i++) {
              let employee = employees[i];
              withLog(this.service.getPosition(employee.positionId)).subscribe(p=>{
                let view = new EmployeeLinkView();
                view.id = employee.id;
                view.name = `${employee.firstName} ${employee.lastName}`;
                view.position = p && p.name;
                this.employees.push(view);
              });
            }
          })
      }
      else
        this.employees = [];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showDetails(employee: Employee): void {
    this.router.navigateByUrl(`details?input=${this.input}&id=${employee.id}`);
  }

}