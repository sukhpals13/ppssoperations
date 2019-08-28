import { TestBed } from '@angular/core/testing';

import { GetSetService } from './get-set.service';

describe('GetSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSetService = TestBed.get(GetSetService);
    expect(service).toBeTruthy();
  });
});
