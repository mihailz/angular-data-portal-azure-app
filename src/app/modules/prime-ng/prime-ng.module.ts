import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgTableComponent } from './prime-ng-table/prime-ng-table.component';
import { PrimeNgRoutingModule } from './prime-ng-routing.module';

@NgModule({
  declarations: [
    PrimeNgTableComponent
  ],
  imports: [
    CommonModule,
    PrimeNgRoutingModule
  ]
})
export class PrimeNgModule { }
