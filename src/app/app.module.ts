import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeLinkComponent } from './employee-link.component';
import { EmployeeDetailsComponent } from './employee-details.component';
import { TestComponent } from './test.component';

import { EmployeeService } from './employee.service';
//import { MockEmployeeService } from './mock-data';
import { EmployeeHttpService } from './employee-http.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeLinkComponent,
    EmployeeDetailsComponent,
    TestComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ {provide: EmployeeService, useClass: /*MockEmployeeService*/ EmployeeHttpService } ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
