import { TestBed } from '@angular/core/testing';

import { DeleteServicesService } from './delete-services.service';

describe('DeleteServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteServicesService = TestBed.get(DeleteServicesService);
    expect(service).toBeTruthy();
  });
});
