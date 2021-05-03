import { TestBed } from '@angular/core/testing';

import { RegistercomplaintService } from './registercomplaint.service';

describe('RegistercomplaintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistercomplaintService = TestBed.get(RegistercomplaintService);
    expect(service).toBeTruthy();
  });
});
