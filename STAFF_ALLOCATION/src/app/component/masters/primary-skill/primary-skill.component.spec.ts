import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarySkillComponent } from './primary-skill.component';

describe('PrimarySkillComponent', () => {
  let component: PrimarySkillComponent;
  let fixture: ComponentFixture<PrimarySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimarySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimarySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
