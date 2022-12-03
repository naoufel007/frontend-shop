import { TestBed, inject } from '@angular/core/testing';

import { FakerService } from './faker.service';

describe('FakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakerService]
    });
  });

  it('should be created', inject([FakerService], (service: FakerService) => {
    expect(service).toBeTruthy();
  }));
});
