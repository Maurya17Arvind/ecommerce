import { TestBed } from '@angular/core/testing';

import { AuthAuthenticationService } from './auth-authentication.service';

describe('AuthAuthenticationService', () => {
  let service: AuthAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
