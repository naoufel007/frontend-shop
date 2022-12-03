import { TestBed, inject } from '@angular/core/testing';

import { VenteFakerService } from './vente-faker.service';

describe('VenteFakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenteFakerService]
    });
  });

  it('should be created', inject([VenteFakerService], (service: VenteFakerService) => {
    expect(service).toBeTruthy();
  }));
});
