import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from '../services/keycloak/keycloak.service';
import { JWTAuthenticationService } from '../services/models/jwtauthentication-service';

export function authServiceFactory(
  oAuthService: OAuthService
): JWTAuthenticationService {
  // Add your condition to choose the implementation
  const useKeycloak = true;

  if (useKeycloak) {
    return new KeycloakService(oAuthService);
  } else {
    throw new Error('No implementation selected.'); // Handle the case when no implementation is chosen
  }
}
