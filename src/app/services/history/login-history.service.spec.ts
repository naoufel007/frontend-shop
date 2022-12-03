import { TestBed, inject } from '@angular/core/testing';

import { LoginHistoryService } from './login-history.service';

describe('LoginHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHistoryService]
    });
  });

  it('should be created', inject([LoginHistoryService], (service: LoginHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
