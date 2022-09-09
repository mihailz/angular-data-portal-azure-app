import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZorroUpdateTableComponent } from './ng-zorro-update-table.component';

describe('NgZorroUpdateTableComponent', () => {
  let component: NgZorroUpdateTableComponent;
  let fixture: ComponentFixture<NgZorroUpdateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgZorroUpdateTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgZorroUpdateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
