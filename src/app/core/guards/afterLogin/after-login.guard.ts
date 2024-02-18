import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const afterLoginGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const authenticationService = inject(AuthService);
  const router = inject(Router);
  if (!authenticationService.tokenIsValid()) {
    await authenticationService.login();
    return false;
  } else {
    return router.createUrlTree(['/app']);
  }
};
