import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveResourceComponent } from './approve-resource.component';

describe('ApproveResourceComponent', () => {
  let component: ApproveResourceComponent;
  let fixture: ComponentFixture<ApproveResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
