import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { ColumnType, TableColumn } from 'src/app/model/table-column';
import { User } from 'src/app/model/user';
import { TableDataMockService } from 'src/app/service/table-data-mock.service';

@Component({
  selector: 'app-ng-zorro-table',
  templateUrl: './ng-zorro-table.component.html',
  styleUrls: ['./ng-zorro-table.component.scss'],
})
export class NgZorroTableComponent implements OnInit, OnDestroy {
  tableData: any;
  tableColumns: TableColumn<User>[] = [];
  isFetchingData: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private tableDataMockService: TableDataMockService
  ) {}

  ngOnInit(): void {
    this.fetchTableData();
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
        this.initTableColumns();
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

  private initTableColumns(): void {
    this.tableColumns = [
      {
        key: 'name',
        label: 'Name',
        columnType: ColumnType.STRING,
        sortFn: (userA: User, userB: User) =>
          userA.name.localeCompare(userB.name),
      },
      {
        key: 'surname',
        label: 'Surname',
        columnType: ColumnType.STRING,
        sortFn: (userA: User, userB: User) =>
          userA.surname.localeCompare(userB.surname),
      },
      {
        key: 'age',
        label: 'Age',
        columnType: ColumnType.NUMBER,
        sortFn: (userA: User, userB: User) => userA.age - userB.age,
      },
      {
        key: 'email',
        label: 'E-mail',
        columnType: ColumnType.STRING,
        sortFn: (userA: User, userB: User) =>
          userA.email.localeCompare(userB.email),
      }
    ];
  }
}
