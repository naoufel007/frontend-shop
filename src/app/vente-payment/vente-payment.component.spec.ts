import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentePaymentComponent } from './vente-payment.component';

describe('VentePaymentComponent', () => {
  let component: VentePaymentComponent;
  let fixture: ComponentFixture<VentePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
