import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateresourceComponent } from './createresource.component';

describe('CreateresourceComponent', () => {
  let component: CreateresourceComponent;
  let fixture: ComponentFixture<CreateresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
