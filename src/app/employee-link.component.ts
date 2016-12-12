import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'employee-link',
  template: `
    <div class="content">
      <a class="header" (click)="onSelected()">{{employee.name}}</a>
      <div class="extra">
        <p>{{positionName}}</p>
      </div>
    </div>
  `
})
export class EmployeeLinkComponent implements OnInit {
  @Input() employee: Employee;
  positionName: string;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: EmployeeService){}
  ngOnInit() {
    this.service.getPosition(this.employee.positionId)
    .then(p=>this.positionName = p && p.name)
    .catch(e=>console.error(e));
  }
  
  onSelected(){
    this.selected.emit();
  }
}
