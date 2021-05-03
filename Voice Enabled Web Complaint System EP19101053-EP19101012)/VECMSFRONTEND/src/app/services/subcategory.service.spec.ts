import { TestBed } from '@angular/core/testing';

import { SubcategoryService } from './subcategory.service';

describe('SubcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoryService = TestBed.get(SubcategoryService);
    expect(service).toBeTruthy();
  });
});
