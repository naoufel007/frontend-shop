import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVentesListComponent } from './client-ventes-list.component';

describe('ClientVentesListComponent', () => {
  let component: ClientVentesListComponent;
  let fixture: ComponentFixture<ClientVentesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientVentesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVentesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
