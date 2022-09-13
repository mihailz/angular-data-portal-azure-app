import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { TableColumn } from 'src/app/model/table-column';
import { TableColumnsService } from 'src/app/service/table-columns.service';
import { ColumnsFilterModalComponent } from '../columns-filter-modal/columns-filter-modal.component';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit, OnDestroy {

  @Input() tableColumns: TableColumn[] = [];
  @Output() onSearchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() onTableColumnsActiveStatusChange: EventEmitter<TableColumn[]> = new EventEmitter<TableColumn[]>();
  private subscriptions: Subscription = new Subscription();

  constructor(private nzModalService: NzModalService, private tableColumnsService: TableColumnsService) { }

  ngOnInit(): void {
    this.listenForActiveTableColumns();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onSearch(event: Event): void {
    const searchValue = (<HTMLInputElement>event.target).value;
    this.onSearchEvent.emit(searchValue);
  }

  openColumnsFilterModal(): void {
    this.nzModalService.create({
      nzContent: ColumnsFilterModalComponent,
      nzFooter: null,
      nzComponentParams: {
        tableColumns: this.tableColumns
      }
    });
  }

  private listenForActiveTableColumns(): void {
    const subscription = this.tableColumnsService.getCheckedTableColumns()
    .subscribe({
      next: (checkedTableColumns: TableColumn[]) => {
        this.onTableColumnsActiveStatusChange.next(checkedTableColumns);
      }
    });
    this.subscriptions.add(subscription);
  }

}
