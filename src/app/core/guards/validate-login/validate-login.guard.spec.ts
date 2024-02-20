import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateLoginGuard } from './validate-login.guard';

describe('validateLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => validateLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
