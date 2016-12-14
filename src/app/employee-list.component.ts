import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee-list',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div class="ui divided items" *ngIf="!loading">
      <employee-link class="item" *ngFor="let employee of employees" [employee]="employee" (selected)="showDetails(employee)"></employee-link>
    </div>
  `,
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  loading: boolean;
  employees: Employee[];
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

        let request: (() => Promise<Employee[]>) = chiefId
          ? () => this.service.getSubordinates(+chiefId)
          : () => this.service.searchEmployees(this.input);

        request()
          .then(employees => { this.loading = false; this.employees = employees; })
          .catch(error => { this.loading = false; console.error(error); });
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