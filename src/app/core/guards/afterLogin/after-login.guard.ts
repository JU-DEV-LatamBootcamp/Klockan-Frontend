import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const afterLoginGuard: CanActivateFn = async (
  route
): Promise<boolean | UrlTree> => {
  const authenticationService = inject(AuthService);
  const router = inject(Router);
  if (!authenticationService.tokenIsValid()) {
    return true;
  } else {
    return router.createUrlTree(['/app']); // Redirect to login otherwise
  }
};
