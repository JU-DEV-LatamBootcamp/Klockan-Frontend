import { Inject, Injectable } from '@angular/core';
import { JWTAuthenticationService } from '../models/jwtauthentication-service';
import { JWT_AUTH_SERVICE } from '../../injection-tokens/jwt-authentication.token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(JWT_AUTH_SERVICE) private jwtAuthService: JWTAuthenticationService,
    private router: Router
  ) {}
  getPayloadFromToken(token: string) {
    return this.jwtAuthService.getPayloadFromToken(token);
  }
  getUsername(payload: unknown): string | null {
    return this.jwtAuthService.getPreferredUsernameFromPayload(payload);
  }

  async login() {
    const token = await this.jwtAuthService.loginAndGetToken();
    sessionStorage.setItem('token', token);
  }

  get token() {
    return this.jwtAuthService.getToken();
  }

  tokenIsValid() {
    return this.jwtAuthService.tokenIsValid();
  }

  logOut() {
    this.jwtAuthService.logOut();
    this.router.navigateByUrl('/');
  }
}
