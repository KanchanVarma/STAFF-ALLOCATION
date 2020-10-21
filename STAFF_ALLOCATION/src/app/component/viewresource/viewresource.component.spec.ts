import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewresourceComponent } from './viewresource.component';

describe('ViewresourceComponent', () => {
  let component: ViewresourceComponent;
  let fixture: ComponentFixture<ViewresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
