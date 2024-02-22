import { Inject, Injectable } from '@angular/core';

import { JWTAuthenticationService } from '../models/jwtauthentication-service';
import { JWT_AUTH_SERVICE } from '../../injection-tokens/jwt-authentication.token';
import { KeycloakTokenPayload } from '../keycloak/keycloak.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(JWT_AUTH_SERVICE) private jwtAuthService: JWTAuthenticationService
  ) {}
  getPayloadFromToken(token: string) {
    return this.jwtAuthService.getPayloadFromToken(token);
  }
  getUsername(payload: KeycloakTokenPayload): string | null {
    return this.jwtAuthService.getPreferredUsernameFromPayload(payload);
  }

  async login() {
    await this.jwtAuthService.loginAndGetToken();
  }

  get token() {
    return this.jwtAuthService.getToken();
  }

  tokenIsValid() {
    return this.jwtAuthService.tokenIsValid();
  }

  logOut() {
    this.jwtAuthService.logOut();
  }
}
