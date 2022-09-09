import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NgZorroTableComponent } from './ng-zorro-table/ng-zorro-table.component';
import { NgZorroUpdateTableComponent } from './ng-zorro-update-table/ng-zorro-update-table.component';

const routes: Route[] = [
  {
    path: '',
    component: NgZorroTableComponent
  },
  {
    path: 'update',
    component: NgZorroUpdateTableComponent
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
export class NgZorroRoutingModule { }
