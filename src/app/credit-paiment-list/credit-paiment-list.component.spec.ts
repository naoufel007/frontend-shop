import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaimentListComponent } from './credit-paiment-list.component';

describe('CreditPaimentListComponent', () => {
  let component: CreditPaimentListComponent;
  let fixture: ComponentFixture<CreditPaimentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditPaimentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPaimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
