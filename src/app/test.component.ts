import { Component } from '@angular/core';
import { Employee } from './models/employee';
import { EMPLOYEES, POSITIONS, DEPARTMENTS, COMPANIES } from './mock-data';

@Component({
  selector: 'test',
  template: `
    <!--<p *ngFor="let item of items">{{item}}</p>-->
    <p (click)="click()">{{str}}</p>
    <input type="file" accept=".jpg,.jpeg" #file (change)="onChoose(file.files[0])"/>
  `
})
export class TestComponent {
  items: string[];
  str: string = "{\"$where\":\"(this.firstName + \\\" \\\" + this.lastName).toLowerCase().indexOf(\\\"www\\\") >= 0\"}";

  /*JSON.stringify({
    $where: `(this.firstName + " " + this.lastName).toLowerCase().indexOf(${JSON.stringify('WwW""').toLowerCase()}) >= 0`
  });*/

  constructor() {
    this.items = COMPANIES.map(e => JSON.stringify(e));
  }

  click(): void {
    let obj = JSON.parse(JSON.stringify({
      $where: `(this.firstName + " " + this.lastName).toLowerCase().indexOf(${JSON.stringify("E").toLowerCase()}) >= 0`
    }));
    console.log(obj.$where);
    console.log(JSON.parse(this.str));
  }

  onChoose(file: any): void {
    //console.log(file);
    let reader = new FileReader();
    reader.onload = function () {
      let arrayBuffer = this.result,
        array = new Uint8Array(arrayBuffer),
        binaryString = btoa(String.fromCharCode.apply(null, array));
      console.log(binaryString);
    }
    reader.readAsArrayBuffer(file);
  }
}