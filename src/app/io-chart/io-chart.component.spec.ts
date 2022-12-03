import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoChartComponent } from './io-chart.component';

describe('IoChartComponent', () => {
  let component: IoChartComponent;
  let fixture: ComponentFixture<IoChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
