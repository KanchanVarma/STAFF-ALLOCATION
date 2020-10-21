import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresourcerequestComponent } from './searchresourcerequest.component';

describe('SearchresourcerequestComponent', () => {
  let component: SearchresourcerequestComponent;
  let fixture: ComponentFixture<SearchresourcerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresourcerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresourcerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
