import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateRoleGuard } from './validate-role.guard';

describe('validateRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
