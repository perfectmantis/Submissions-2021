import { TestBed } from '@angular/core/testing';

import { UseregistrationService } from './useregistration.service';

describe('UseregistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UseregistrationService = TestBed.get(UseregistrationService);
    expect(service).toBeTruthy();
  });
});
