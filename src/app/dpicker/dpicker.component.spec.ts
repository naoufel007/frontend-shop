import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpickerComponent } from './dpicker.component';

describe('DpickerComponent', () => {
  let component: DpickerComponent;
  let fixture: ComponentFixture<DpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
