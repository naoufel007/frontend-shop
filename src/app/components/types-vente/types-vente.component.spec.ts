import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesVenteComponent } from './types-vente.component';

describe('TypesVenteComponent', () => {
  let component: TypesVenteComponent;
  let fixture: ComponentFixture<TypesVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
