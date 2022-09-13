import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ColumnType, TableColumn } from 'src/app/model/table-column';
import { User } from 'src/app/model/user';
import { TableDataMockService } from 'src/app/service/table-data-mock.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddTableRowModalComponent } from './add-table-row-modal/add-table-row-modal.component';

@Component({
  selector: 'app-ng-zorro-update-table',
  templateUrl: './ng-zorro-update-table.component.html',
  styleUrls: ['./ng-zorro-update-table.component.scss'],
})
export class NgZorroUpdateTableComponent implements OnInit, OnDestroy {
  isFetchingData: boolean = false;
  tableRows: any;
  filteredTableRows: any;
  tableColumns: TableColumn[] = [];
  userFormGroup!: FormGroup;
  columnType = ColumnType;
  checked = false;
  checkedDataTableRows: User[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private tableDataMockService: TableDataMockService,
    private fb: FormBuilder,
    private nzModalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      users: this.fb.array([]),
    });
    this.fetchTableData();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe;
  }

  fetchTableData(): void {
    this.isFetchingData = true;
    const subscription = this.tableDataMockService
      .getTableData()
      .pipe(
        map((response: User[]) =>
          response.map((user: User) => {
            return { ...user, isUpdating: false };
          })
        )
      )
      .subscribe({
        next: (tableData: User[]) => {
          this.isFetchingData = false;
          this.tableRows = tableData;
          this.filteredTableRows = [...this.tableRows];
          this.filteredTableRows.forEach((tableRow: any) => {
            tableRow.checked = false;
          });
          this.initFormArray(this.filteredTableRows);
          this.initTableColumns();
        },
        error: (error: any) => {
          console.log(error);
          this.isFetchingData = false;
        },
      });
    this.subscriptions.add(subscription);
  }

  get usersArray(): FormArray {
    return this.userFormGroup.get('users') as FormArray;
  }

  initFormArray(tableData: User[]): void {
    tableData.forEach((dataItem: User) => {
      const userFormGroup = this.fb.group({
        name: this.fb.control(dataItem.name, [Validators.required]),
        surname: this.fb.control(dataItem.surname, [Validators.required]),
        age: this.fb.control(dataItem.age, [Validators.required]),
        email: this.fb.control(dataItem.email, [
          Validators.required,
          Validators.email,
        ]),
      });
      this.usersArray.push(userFormGroup);
    });
  }

  navigateToTableComponent(): void {
    this.router.navigate(['/ng-zorro']);
  }

  goInEditMode(rowIndex: number): void {
    this.filteredTableRows[rowIndex].isUpdating = true;
  }

  exitRowEditMode(rowIndex: number): void {
    this.filteredTableRows[rowIndex].isUpdating = false;
  }

  deleteRow(rowIndex: number): void {
    this.tableDataMockService.deleteTableRow(rowIndex);
  }

  updateRowData(rowIndex: number): void {
    const updatedUserRowGroup = <FormGroup>this.usersArray.at(rowIndex);

    if (!updatedUserRowGroup.valid) {
      Object.values(updatedUserRowGroup.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      const updatedUserRowGroupControlls = updatedUserRowGroup.controls;
      const userName = updatedUserRowGroupControlls['name'].value;
      const surname = updatedUserRowGroupControlls['surname'].value;
      const age = updatedUserRowGroupControlls['age'].value;
      const email = updatedUserRowGroupControlls['email'].value;

      const updatedDataRow: User = new User(userName, surname, age, email);

      this.tableDataMockService.updateTableRow(rowIndex, updatedDataRow);
    }
  }

  openAddTableRowModal(): void {
    this.nzModalService.create({
      nzContent: AddTableRowModalComponent,
      nzFooter: null,
    });
  }

  onTableRowChecked(rowIndex: number, checked: boolean): void {
    if (checked) {
      this.checkedDataTableRows.push(this.filteredTableRows[rowIndex]);
      console.log('onTableRowChecked - checkedDataTableRows: ', this.checkedDataTableRows);
    } else {
      this.checkedDataTableRows.splice(rowIndex, 1);
      console.log('onTableRowChecked - checkedDataTableRows: ', this.checkedDataTableRows);
    }
  }

  onCheckAll(checked: boolean): void {
    if (checked) {
      this.filteredTableRows.map((dataRow: any) => {
        dataRow.checked = true;
      });
      this.checkedDataTableRows = [...this.filteredTableRows];
    } else {
      this.filteredTableRows.map((dataRow: any) => {
        dataRow.checked = false;
      });
      this.checkedDataTableRows = [];
    }
    console.log('onCheckAll - checkedDataTableRows: ', this.checkedDataTableRows);
  }

  private initTableColumns(): void {
    this.tableColumns = [
      {
        key: 'name',
        label: 'Name',
        columnType: ColumnType.STRING,
        checked: false,
        sortFn: (userA: User, userB: User) =>
          userA.name.localeCompare(userB.name),
      },
      {
        key: 'surname',
        label: 'Surname',
        columnType: ColumnType.STRING,
        checked: false,
        sortFn: (userA: User, userB: User) =>
          userA.surname.localeCompare(userB.surname),
      },
      {
        key: 'age',
        label: 'Age',
        columnType: ColumnType.NUMBER,
        checked: false,
        sortFn: (userA: User, userB: User) => userA.age - userB.age,
      },
      {
        key: 'email',
        label: 'E-mail',
        columnType: ColumnType.STRING,
        checked: false,
        sortFn: (userA: User, userB: User) =>
          userA.email.localeCompare(userB.email),
      },
    ];
  }
}
