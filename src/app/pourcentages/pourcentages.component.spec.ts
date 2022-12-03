import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PourcentagesComponent } from './pourcentages.component';

describe('PourcentagesComponent', () => {
  let component: PourcentagesComponent;
  let fixture: ComponentFixture<PourcentagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PourcentagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PourcentagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
