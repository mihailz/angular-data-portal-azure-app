import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsFilterModalComponent } from './columns-filter-modal.component';

describe('ColumnsFilterModalComponent', () => {
  let component: ColumnsFilterModalComponent;
  let fixture: ComponentFixture<ColumnsFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsFilterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
