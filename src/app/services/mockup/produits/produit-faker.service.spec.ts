import { TestBed, inject } from '@angular/core/testing';

import { ProduitFakerService } from './produit-faker.service';

describe('ProduitFakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitFakerService]
    });
  });

  it('should be created', inject([ProduitFakerService], (service: ProduitFakerService) => {
    expect(service).toBeTruthy();
  }));
});
