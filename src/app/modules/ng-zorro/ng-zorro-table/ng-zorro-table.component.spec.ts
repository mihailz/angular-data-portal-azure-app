import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgZorroTableComponent } from './ng-zorro-table.component';

describe('NgZorroTableComponent', () => {
  let component: NgZorroTableComponent;
  let fixture: ComponentFixture<NgZorroTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgZorroTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgZorroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
