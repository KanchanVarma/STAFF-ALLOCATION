import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNewHireComponent } from './approve-new-hire.component';

describe('ApproveNewHireComponent', () => {
  let component: ApproveNewHireComponent;
  let fixture: ComponentFixture<ApproveNewHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveNewHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNewHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
