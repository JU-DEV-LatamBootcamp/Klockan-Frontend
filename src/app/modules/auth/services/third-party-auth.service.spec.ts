import { TestBed } from '@angular/core/testing';

import { ThirdPartyAuthService } from './third-party-auth.service';

describe('ThirdPartyAuthService', () => {
  let service: ThirdPartyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
