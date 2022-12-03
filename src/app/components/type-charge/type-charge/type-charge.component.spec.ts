import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeChargeComponent } from './type-charge.component';

describe('TypeChargeComponent', () => {
  let component: TypeChargeComponent;
  let fixture: ComponentFixture<TypeChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
