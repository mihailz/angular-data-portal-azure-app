import { NzTableSortFn } from "ng-zorro-antd/table";

export enum ColumnType {
  STRING = 'string',
  NUMBER = 'number'
}

export interface TableColumn {
  key: string;
  label: string;
  columnType: ColumnType;
  checked?: boolean;
  sortFn?: (a: any, b: any) => any;
}
