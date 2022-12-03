import { TestBed, inject } from '@angular/core/testing';

import { AgencesService } from './agences.service';

describe('AgencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencesService]
    });
  });

  it('should be created', inject([AgencesService], (service: AgencesService) => {
    expect(service).toBeTruthy();
  }));
});
