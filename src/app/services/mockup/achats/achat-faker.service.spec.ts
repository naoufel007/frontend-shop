import { TestBed, inject } from '@angular/core/testing';

import { AchatFakerService } from './achat-faker.service';

describe('AchatFakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchatFakerService]
    });
  });

  it('should be created', inject([AchatFakerService], (service: AchatFakerService) => {
    expect(service).toBeTruthy();
  }));
});
