import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JWTAuthenticationService } from '../models/jwtauthentication-service';

type KeycloakTokenPayload = {
  preferred_username: string;
};

@Injectable({
  providedIn: 'root',
})
export class KeycloakService implements JWTAuthenticationService {
  constructor(private readonly _oAuthService: OAuthService) {}

  getPreferredUsernameFromPayload(
    payload: KeycloakTokenPayload
  ): string | null {
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

  async loginAndGetToken() {
    await setTimeout(async () => {
      await this._oAuthService.loadDiscoveryDocumentAndTryLogin();
      this._oAuthService.initLoginFlow();
    }, 500);
    return this._oAuthService.getAccessToken();
  }

  tokenIsValid() {
    return this._oAuthService.hasValidAccessToken();
  }

  logOut() {
    this._oAuthService.logOut(false);
  }
}
