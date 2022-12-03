import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourManagerComponent } from './retour-manager.component';

describe('RetourManagerComponent', () => {
  let component: RetourManagerComponent;
  let fixture: ComponentFixture<RetourManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetourManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetourManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
