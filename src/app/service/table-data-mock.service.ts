import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class TableDataMockService {

  private tableData: User[] = [
    {
      name: 'Nick',
      surname: 'Simmons',
      age: 20,
      email: 'nick@gmail.com',
    },
    {
      name: 'Maria',
      surname: 'Sokolova',
      age: 24,
      email: 'maria@gmail.com',
    },
    {
      name: 'Tobby',
      surname: 'Soffia',
      age: 32,
      email: 'tobby@gmail.com',
    },
    {
      name: 'Adam',
      surname: 'Smith',
      age: 44,
      email: 'adam@gmail.com',
    },
    {
      name: 'Monica',
      surname: 'Simmons',
      age: 19,
      email: 'monica@gmail.com',
    },
  ];

  private tableData$: Subject<User[]> = new BehaviorSubject(this.tableData);

  constructor() {}

  getTableData(): Observable<User[]> {
    return this.tableData$.pipe(
      map((tableData: any) =>
        tableData.map(
          (dataItem: any) =>
            new User(
              dataItem.name,
              dataItem.surname,
              dataItem.age,
              dataItem.email
            )
        )
      )
    );
  }

  updateTableRow(rowIndex: number, updatedRow: User): void {
    this.tableData[rowIndex] = updatedRow;
    this.tableData$.next(this.tableData);
  }

  deleteTableRow(rowIndex: number): void {
    this.tableData.splice(rowIndex, 1);
    this.tableData$.next(this.tableData);
  }

  addTableRow(tableRow: User): void {
    this.tableData.push(tableRow);
    this.tableData$.next(this.tableData);
  }
}
