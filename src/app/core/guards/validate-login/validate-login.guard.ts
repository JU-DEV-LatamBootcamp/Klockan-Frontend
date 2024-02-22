import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const validateLoginGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.tokenIsValid()) {
    return true; // Allow access if logged in
  } else {
    return router.createUrlTree(['/']); // Redirect to login otherwise
  }
};
