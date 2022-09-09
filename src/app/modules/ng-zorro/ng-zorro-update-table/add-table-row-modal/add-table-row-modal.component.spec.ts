import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableRowModalComponent } from './add-table-row-modal.component';

describe('AddTableRowModalComponent', () => {
  let component: AddTableRowModalComponent;
  let fixture: ComponentFixture<AddTableRowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTableRowModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTableRowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
