import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitresourceComponent } from './exitresource.component';

describe('ExitresourceComponent', () => {
  let component: ExitresourceComponent;
  let fixture: ComponentFixture<ExitresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
