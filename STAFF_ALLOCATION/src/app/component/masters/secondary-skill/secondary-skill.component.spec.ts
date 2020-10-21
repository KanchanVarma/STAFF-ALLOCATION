import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarySkillComponent } from './secondary-skill.component';

describe('SecondarySkillComponent', () => {
  let component: SecondarySkillComponent;
  let fixture: ComponentFixture<SecondarySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondarySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondarySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
