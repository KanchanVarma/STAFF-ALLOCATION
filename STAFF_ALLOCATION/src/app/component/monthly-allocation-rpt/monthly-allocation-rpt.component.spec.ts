import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAllocationRptComponent } from './monthly-allocation-rpt.component';

describe('MonthlyAllocationRptComponent', () => {
  let component: MonthlyAllocationRptComponent;
  let fixture: ComponentFixture<MonthlyAllocationRptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyAllocationRptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAllocationRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
