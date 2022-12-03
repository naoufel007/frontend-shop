import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePaymentsComponent } from './sale-payments.component';

describe('SalePaymentsComponent', () => {
  let component: SalePaymentsComponent;
  let fixture: ComponentFixture<SalePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
