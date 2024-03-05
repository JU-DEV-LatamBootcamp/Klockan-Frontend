import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { JWTAuthenticationService } from '../models/jwtauthentication-service';
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
    const token = this.getToken();
    const payload = token ? this.getPayloadFromToken(token) : null;

    return payload
      ? {
          name: payload.name,
          email: payload.email,
          familyName: payload.family_name,
          givenName: payload.given_name,
          userName: payload.preferred_username,
          roles: payload.roles,
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

  tokenIsValid(): boolean {
    return this._oAuthService.hasValidAccessToken();
  }

  logOut(): void {
    this._oAuthService.logOut();
  }
}
