import { TestBed } from '@angular/core/testing';

import { TableColumnsService } from './table-columns.service';

describe('TableColumnsService', () => {
  let service: TableColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
