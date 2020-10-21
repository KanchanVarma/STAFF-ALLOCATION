import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagementComponent } from './search-project.component';

describe('ProjectManagementComponent', () => {
  let component: ProjectManagementComponent;
  let fixture: ComponentFixture<ProjectManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
