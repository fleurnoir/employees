import { Component } from '@angular/core';
import { Employee } from './models/employee';
import { EMPLOYEES, POSITIONS, DEPARTMENTS, COMPANIES } from './mock-data';

@Component({
  selector: 'test',
  template: `
    <p *ngFor="let item of items">{{item}}</p>
  `
})
export class TestComponent {
  items: string[];

  constructor(){
    this.items = COMPANIES.map(e=>JSON.stringify(e));
  }
}