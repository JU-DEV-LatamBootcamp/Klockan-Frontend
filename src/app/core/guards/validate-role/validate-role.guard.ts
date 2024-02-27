import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { KeycloakService } from '../../services/keycloak/keycloak.service';

export const validateRoleGuard: CanActivateFn = async (): Promise<
  boolean | UrlTree
> => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  if (keycloakService.getUserDetails()?.roles.includes('admin')) {
    return true;
  } else {
    return router.createUrlTree(['/app/dashboard']);
  }
};
