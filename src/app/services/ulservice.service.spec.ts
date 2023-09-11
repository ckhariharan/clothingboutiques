import { TestBed } from '@angular/core/testing';

import { UlserviceService } from './ulservice.service';

describe('UlserviceService', () => {
  let service: UlserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
