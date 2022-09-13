import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColumnType, TableColumn } from 'src/app/model/table-column';
import { User } from 'src/app/model/user';
import { TableColumnsService } from 'src/app/service/table-columns.service';
import { TableDataMockService } from 'src/app/service/table-data-mock.service';

@Component({
  selector: 'app-ng-zorro-table',
  templateUrl: './ng-zorro-table.component.html',
  styleUrls: ['./ng-zorro-table.component.scss'],
})
export class NgZorroTableComponent implements OnInit, OnDestroy {
  tableData: any;
  filteredTableData: any;
  tableColumns: TableColumn[] = [];
  isFetchingData: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private tableDataMockService: TableDataMockService,
    private tableColumnsService: TableColumnsService
  ) {}

  ngOnInit(): void {
    this.fetchTableData();
  }

  listenForColumnsStateChange(): void {
    const subscription = this.tableColumnsService.getCheckedTableColumns()
    .subscribe({
      next: (columns: TableColumn[]) => {
        this.tableColumns = columns;
      }
    });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe;
  }

  fetchTableData(): void {
    this.isFetchingData = true;
    const subscription = this.tableDataMockService.getTableData()
    .subscribe({
      next: (tableData: User[]) => {
        this.isFetchingData = false;
        this.tableData = tableData;
        this.filteredTableData = [...this.tableData];
        this.initTableColumns();
        console.log('fetchTableData: ', this.tableColumns);

        this.listenForColumnsStateChange();
      },
      error: (error: any) => {
        console.log(error);
        this.isFetchingData = false;
      }
    });
    this.subscriptions.add(subscription);
  }

  navigateToUpdateTablePage(): void {
    this.router.navigate(['/ng-zorro/update']);
  }

  onDataSearch(searchValue: string): void {
    const searchValueToLowewCase = searchValue.toLowerCase();
    this.filteredTableData = this.tableData.filter((dataRow: any) =>
       this.tableColumns.some((tableColumn: TableColumn) =>
       dataRow[tableColumn.key].toString().toLowerCase().includes(searchValueToLowewCase))
    );
  }

  onColumnsActiveStatusChange(tableColumns: TableColumn[]): void {
    this.tableColumns = [...tableColumns];
  }

  private initTableColumns(): void {
    this.tableColumns = [
      {
        key: 'name',
        label: 'Name',
        columnType: ColumnType.STRING,
        checked: true,
        sortFn: (userA: User, userB: User) =>
          userA.name.localeCompare(userB.name),
      },
      {
        key: 'surname',
        label: 'Surname',
        columnType: ColumnType.STRING,
        checked: true,
        sortFn: (userA: User, userB: User) =>
          userA.surname.localeCompare(userB.surname),
      },
      {
        key: 'age',
        label: 'Age',
        columnType: ColumnType.NUMBER,
        checked: true,
        sortFn: (userA: User, userB: User) => userA.age - userB.age,
      },
      {
        key: 'email',
        label: 'E-mail',
        columnType: ColumnType.STRING,
        checked: true,
        sortFn: (userA: User, userB: User) =>
          userA.email.localeCompare(userB.email),
      }
    ];
  }
}
