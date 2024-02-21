import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JWTAuthenticationService } from '../models/jwtauthentication-service';

type KeycloakTokenPayload = {
  preferred_username: string;
};
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from 'src/app/shared/config/keycloak.config';
import { KeycloakTokenPayload, ProfileFromKeycloak } from './keycloak.types';

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

  getUserDetails(): ProfileFromKeycloak | null {
    const token = this.token;
    const payload = token ? this.getPayloadFromToken(token) : null;

    return payload
      ? {
          name: payload.name,
          email: payload.email,
          familyName: payload.family_name,
          givenName: payload.given_name,
          userName: payload.preferred_username,
        }
      : null;
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
    this._oAuthService.initImplicitFlow();
    return this._oAuthService.getAccessToken();
  }

  getToken(): string {
    return this._oAuthService.getAccessToken();
  }

  tokenIsValid() {
    return this._oAuthService.hasValidAccessToken();
  }

  logOut() {
    this._oAuthService.logOut();
  }
}
