import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer + '/auth',
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
    });
}
