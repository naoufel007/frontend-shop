import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurManagerComponent } from './fournisseur-manager.component';

describe('FournisseurManagerComponent', () => {
  let component: FournisseurManagerComponent;
  let fixture: ComponentFixture<FournisseurManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
