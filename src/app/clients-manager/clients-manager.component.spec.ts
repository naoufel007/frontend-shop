import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsManagerComponent } from './clients-manager.component';

describe('ClientsManagerComponent', () => {
  let component: ClientsManagerComponent;
  let fixture: ComponentFixture<ClientsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
