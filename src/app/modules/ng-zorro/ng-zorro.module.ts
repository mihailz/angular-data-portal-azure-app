import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroTableComponent } from './ng-zorro-table/ng-zorro-table.component';
import { NgZorroRoutingModule } from './ng-zorro.routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroUpdateTableComponent } from './ng-zorro-update-table/ng-zorro-update-table.component';
import { AddTableRowModalComponent } from './ng-zorro-update-table/add-table-row-modal/add-table-row-modal.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { ColumnsFilterModalComponent } from './columns-filter-modal/columns-filter-modal.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    NgZorroTableComponent,
    NgZorroUpdateTableComponent,
    AddTableRowModalComponent,
    TableFilterComponent,
    ColumnsFilterModalComponent
  ],
  imports: [
    CommonModule,
    NgZorroRoutingModule,
    NzTableModule,
    NzDropDownModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NzIconModule,
    NzCheckboxModule,
    FormsModule
  ],
  providers: [
    NzModalService
  ]
})
export class NgZorroModule { }
