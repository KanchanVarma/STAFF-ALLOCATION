import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewHireComponent } from './request-new-hire.component';

describe('RequestNewHireComponent', () => {
  let component: RequestNewHireComponent;
  let fixture: ComponentFixture<RequestNewHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestNewHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
