import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeLinkComponent }  from './employee-link.component';
import { EmployeeDetailsComponent }  from './employee-details.component';
import { TestComponent } from './test.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search',  component: EmployeeListComponent },
  { path: 'details', component: EmployeeDetailsComponent }
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}