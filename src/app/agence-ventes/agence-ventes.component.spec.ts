import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceVentesComponent } from './agence-ventes.component';

describe('AgenceVentesComponent', () => {
  let component: AgenceVentesComponent;
  let fixture: ComponentFixture<AgenceVentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenceVentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
