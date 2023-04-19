import { TestBed } from '@angular/core/testing';

import { SingInStatusService } from './sing-in-status.service';

describe('SingInStatusService', () => {
  let service: SingInStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingInStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
