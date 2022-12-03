import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHistoryVentesComponent } from './product-history-ventes.component';

describe('ProductHistoryVentesComponent', () => {
  let component: ProductHistoryVentesComponent;
  let fixture: ComponentFixture<ProductHistoryVentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHistoryVentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHistoryVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
