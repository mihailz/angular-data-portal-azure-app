import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PrimeNgTableComponent } from './prime-ng-table/prime-ng-table.component';

const routes: Route[] = [
  {
    path: '',
    component: PrimeNgTableComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PrimeNgRoutingModule { }
