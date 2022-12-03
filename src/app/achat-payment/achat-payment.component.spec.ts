import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatPaymentComponent } from './achat-payment.component';

describe('AchatPaymentComponent', () => {
  let component: AchatPaymentComponent;
  let fixture: ComponentFixture<AchatPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
