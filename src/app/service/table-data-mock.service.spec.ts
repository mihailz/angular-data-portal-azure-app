import { TestBed } from '@angular/core/testing';

import { TableDataMockService } from './table-data-mock.service';

describe('TableDataMockService', () => {
  let service: TableDataMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
