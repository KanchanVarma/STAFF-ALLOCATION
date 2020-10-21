import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresourceComponent } from './searchresource.component';

describe('SearchresourceComponent', () => {
  let component: SearchresourceComponent;
  let fixture: ComponentFixture<SearchresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
