import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceAchatsComponent } from './agence-achats.component';

describe('AgenceAchatsComponent', () => {
  let component: AgenceAchatsComponent;
  let fixture: ComponentFixture<AgenceAchatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenceAchatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
