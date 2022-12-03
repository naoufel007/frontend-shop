import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatLineComponent } from './achat-line.component';

describe('AchatLineComponent', () => {
  let component: AchatLineComponent;
  let fixture: ComponentFixture<AchatLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
