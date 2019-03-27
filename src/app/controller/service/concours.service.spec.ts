import { TestBed } from '@angular/core/testing';

import { ConcoursService } from './concours.service';

describe('ConcoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConcoursService = TestBed.get(ConcoursService);
    expect(service).toBeTruthy();
  });
});
