import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatsManagerComponent } from './achats-manager.component';

describe('AchatsManagerComponent', () => {
  let component: AchatsManagerComponent;
  let fixture: ComponentFixture<AchatsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
