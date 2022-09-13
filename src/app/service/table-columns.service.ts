import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TableColumn } from '../model/table-column';

@Injectable({
  providedIn: 'root'
})
export class TableColumnsService {

  private checkedTableColumns: Subject<TableColumn[]> = new Subject<TableColumn[]>();

  constructor() { }


  setCheckedTableColumns(tableColumns: TableColumn[]): void {
    this.checkedTableColumns.next(tableColumns);
  }

  getCheckedTableColumns(): Observable<TableColumn[]> {
    return this.checkedTableColumns;
  }

}
