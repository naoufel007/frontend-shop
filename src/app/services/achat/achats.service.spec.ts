import { TestBed, inject } from '@angular/core/testing';

import { AchatsService } from './achats.service';

describe('AchatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AchatsService]
    });
  });

  it('should be created', inject([AchatsService], (service: AchatsService) => {
    expect(service).toBeTruthy();
  }));
});
