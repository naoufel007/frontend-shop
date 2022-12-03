import { TestBed, inject } from '@angular/core/testing';

import { BusinessServiceService } from './business-service.service';

describe('BusinessServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessServiceService]
    });
  });

  it('should be created', inject([BusinessServiceService], (service: BusinessServiceService) => {
    expect(service).toBeTruthy();
  }));
});
