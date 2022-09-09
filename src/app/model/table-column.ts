import { NzTableSortFn } from "ng-zorro-antd/table";

export enum ColumnType {
  STRING = 'string',
  NUMBER = 'number'
}

export interface TableColumn<T> {
  key: string;
  label: string;
  columnType: ColumnType;
  sortFn?: (a: T, b: T) => any;
}
