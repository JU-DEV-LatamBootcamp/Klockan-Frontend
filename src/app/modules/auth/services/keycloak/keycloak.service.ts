import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from 'src/app/shared/config/keycloak.config';

type KeycloakTokenPayload = {
  preferred_username: string;
};

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  constructor(private readonly _oAuthService: OAuthService) {}

  getPreferredUsername(payload: KeycloakTokenPayload): string | null {
    return payload?.preferred_username || null;
  }

  getPayloadFromToken(token: string): KeycloakTokenPayload | null {
    try {
      if (!token) throw new Error('Invalid token');

      const chunks = token.split('.');

      // decode payload
      const decodedPayload = atob(chunks[1]);
      const payload = JSON.parse(decodedPayload);

      return payload;
    } catch {
      console.error('Invalid keycloak token');
      return null;
    }
  }

  async configureSingleSingOn() {
    this._oAuthService.configure(authConfig);
    this._oAuthService.tokenValidationHandler = new JwksValidationHandler();
    await this._oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  get token() {
    return this._oAuthService.getAccessToken();
  }

  logOut() {
    this._oAuthService.logOut();
  }
}
