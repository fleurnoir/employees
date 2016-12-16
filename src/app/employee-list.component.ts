import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeLinkView } from './models/employee-link-view';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
        let request: (() => Promise<Employee[]>) = chiefId
          ? () => this.service.getSubordinates(+chiefId)
          : () => this.service.searchEmployees(this.input);

        withLog(request())
          .then(employees => {
            if (!employees) {
              this.loading = false;
              return;
            }

            Promise.all(employees.map(e => withLog(this.service.getPosition(e.positionId))))
              .then(positions => {
                this.loading = false;
                //console.log(positions);
                let result = <EmployeeLinkView[]>[];
                for (let i = 0; i < employees.length; i++) {
                  let view = new EmployeeLinkView();
                  view.id = employees[i].id;
                  view.name = `${employees[i].firstName} ${employees[i].lastName}`;
                  view.position = positions[i].name;
                  result.push(view);
                }
                this.employees = result;
              });
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