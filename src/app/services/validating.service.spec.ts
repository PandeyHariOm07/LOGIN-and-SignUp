import { TestBed } from '@angular/core/testing';

import { ValidatingService } from './validating.service';

describe('ValidatingService', () => {
  let service: ValidatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
