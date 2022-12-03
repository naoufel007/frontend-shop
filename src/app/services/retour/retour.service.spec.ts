import { TestBed, inject } from '@angular/core/testing';

import { RetourService } from './retour.service';

describe('RetourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetourService]
    });
  });

  it('should be created', inject([RetourService], (service: RetourService) => {
    expect(service).toBeTruthy();
  }));
});
