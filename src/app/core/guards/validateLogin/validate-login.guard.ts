import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const validateLoginGuard: CanActivateFn = (route): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.tokenIsValid()) {
    return true; // Allow access if logged in
  } else {
    return router.createUrlTree(['/']); // Redirect to login otherwise
  }
};
