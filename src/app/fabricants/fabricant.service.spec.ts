import { TestBed } from '@angular/core/testing';

import { FabricantService } from './fabricant.service';

describe('FabricantService', () => {
  let service: FabricantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
