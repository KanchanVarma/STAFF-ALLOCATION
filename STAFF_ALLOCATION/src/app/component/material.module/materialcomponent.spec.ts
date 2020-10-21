import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from './materialcomponent';

describe('Material.ModuleComponent', () => {
  let component: MaterialModule;
  let fixture: ComponentFixture<MaterialModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
