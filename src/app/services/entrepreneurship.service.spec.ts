import { TestBed } from '@angular/core/testing';

import { EntrepreneurshipService } from './entrepreneurship.service';

describe('EntrepreneurshipService', () => {
  let service: EntrepreneurshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrepreneurshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
