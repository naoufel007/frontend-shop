import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceEmployeesComponent } from './agence-employees.component';

describe('AgenceEmployeesComponent', () => {
  let component: AgenceEmployeesComponent;
  let fixture: ComponentFixture<AgenceEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenceEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
