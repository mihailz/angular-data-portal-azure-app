import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataMockService {

  private tableData = [
    {
      name: "Nick",
      surname: "Simmons",
      age: 20,
      email: "nick@gmail.com"
    },
    {
      name: "Maria",
      surname: "Sokolova",
      age: 24,
      email: "maria@gmail.com"
    },
    {
      name: "Tobby",
      surname: "Soffia",
      age: 32,
      email: "tobby@gmail.com"
    },
    {
      name: "Adam",
      surname: "Smith",
      age: 44,
      email: "adam@gmail.com"
    },
    {
      name: "Monica",
      surname: "Simmons",
      age: 19,
      email: "monica@gmail.com"
    }
  ];

  constructor() { }

  getTableData() {
    return this.tableData;
  }

}
