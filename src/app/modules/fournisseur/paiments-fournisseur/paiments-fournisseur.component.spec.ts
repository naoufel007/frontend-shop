import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentsFournisseurComponent } from './paiments-fournisseur.component';

describe('PaimentsFournisseurComponent', () => {
  let component: PaimentsFournisseurComponent;
  let fixture: ComponentFixture<PaimentsFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaimentsFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentsFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
