import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagerDashboardComponent } from './resource-manager-dashboard.component';

describe('ResourceManagerDashboardComponent', () => {
  let component: ResourceManagerDashboardComponent;
  let fixture: ComponentFixture<ResourceManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
