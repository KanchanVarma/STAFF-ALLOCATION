import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverejectresourceComponent } from './approverejectresource.component';

describe('ApproverejectresourceComponent', () => {
  let component: ApproverejectresourceComponent;
  let fixture: ComponentFixture<ApproverejectresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverejectresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverejectresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
