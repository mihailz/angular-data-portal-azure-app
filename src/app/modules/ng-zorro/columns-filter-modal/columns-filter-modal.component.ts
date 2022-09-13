import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CheckBox } from 'src/app/model/checkbox.model';
import { TableColumn } from 'src/app/model/table-column';
import { TableColumnsService } from 'src/app/service/table-columns.service';

@Component({
  selector: 'app-columns-filter-modal',
  templateUrl: './columns-filter-modal.component.html',
  styleUrls: ['./columns-filter-modal.component.scss'],
})
export class ColumnsFilterModalComponent implements OnInit {
  @Input() tableColumns: TableColumn[] = [];
  checkedColumnKeys: string[] = [];

  constructor(
    private nzModalRef: NzModalRef,
    private tableColumnsService: TableColumnsService
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.nzModalRef.close();
  }

  onCheckboxesCheckedStatusChange(columnKeys: any): void {
    this.checkedColumnKeys = columnKeys;
  }

  applyFilter(): void {
  const filteredColumns = this.tableColumns.map((column: TableColumn) => {
    const found = this.checkedColumnKeys.some((key: string) => column.key === key);
    if (found) {
      return {
        ...column,
        checked: true
      }
    } else {
      return {
        ...column,
        checked: false
      }
    }
  })
  this.tableColumnsService.setCheckedTableColumns(filteredColumns);
  this.closeModal();
  }
}
