import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { User } from 'src/app/model/user';
import { TableDataMockService } from 'src/app/service/table-data-mock.service';

@Component({
  selector: 'app-add-table-row-modal',
  templateUrl: './add-table-row-modal.component.html',
  styleUrls: ['./add-table-row-modal.component.scss']
})
export class AddTableRowModalComponent implements OnInit {

  userFormGroup!: FormGroup;

  constructor(private nzModalRef: NzModalRef,
     private fb: FormBuilder,
     private tableDataMockService: TableDataMockService) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  closeModal(): void {
    this.nzModalRef.close();
  }

  addTableRow(): void {
    if (!this.userFormGroup.valid) {
      Object.values(this.userFormGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    } else {
      const name = this.userFormGroup.get('name')?.value;
      const surname = this.userFormGroup.get('surname')?.value;
      const age = this.userFormGroup.get('age')?.value;
      const email = this.userFormGroup.get('email')?.value;

      const tableRow: User = new User(
        name, surname, age, email
      );
      this.tableDataMockService.addTableRow(tableRow);
      this.closeModal();
    }
  }

  private initUserForm(): void {
    this.userFormGroup = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      surname: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email])
    });
  }

}
