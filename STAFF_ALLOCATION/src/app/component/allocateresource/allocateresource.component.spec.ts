import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateresourceComponent } from './allocateresource.component';

describe('AllocateresourceComponent', () => {
  let component: AllocateresourceComponent;
  let fixture: ComponentFixture<AllocateresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
