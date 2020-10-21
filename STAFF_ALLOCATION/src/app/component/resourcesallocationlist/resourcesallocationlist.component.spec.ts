import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesallocationlistComponent } from './resourcesallocationlist.component';

describe('ResourcesallocationlistComponent', () => {
  let component: ResourcesallocationlistComponent;
  let fixture: ComponentFixture<ResourcesallocationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesallocationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesallocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
