import { TestBed } from '@angular/core/testing';

import { NumericalMethodsService } from './numerical-methods.service';

describe('NumericalMethodsService', () => {
  let service: NumericalMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumericalMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
