import { APP_INITIALIZER } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../shared/config/keycloak.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authServiceFactory } from '../factories/auth-service.factory';
import { JWT_AUTH_SERVICE } from '../injection-tokens/jwt-authentication.token';

export const AppProviders = [
  {
    provide: APP_INITIALIZER, // Use APP_INITIALIZER for root-level initialization
    useFactory: (oAuthService: OAuthService) => async () => {
      oAuthService.configure(authConfig);
      oAuthService.tokenValidationHandler = new JwksValidationHandler();
      await oAuthService.loadDiscoveryDocumentAndTryLogin();
    },
    deps: [OAuthService], // Inject OAuthService
    multi: true, // Allow multiple initializers if needed
  },
  {
    provide: JWT_AUTH_SERVICE,
    useFactory: authServiceFactory,
    deps: [OAuthService],
  },
];
