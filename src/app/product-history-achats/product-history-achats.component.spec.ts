import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHistoryAchatsComponent } from './product-history-achats.component';

describe('ProductHistoryAchatsComponent', () => {
  let component: ProductHistoryAchatsComponent;
  let fixture: ComponentFixture<ProductHistoryAchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductHistoryAchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHistoryAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
