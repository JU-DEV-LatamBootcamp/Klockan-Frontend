import { Inject, Injectable } from '@angular/core';
import { JWTAuthenticationService } from '../models/jwtauthentication-service';
import { JWT_AUTH_SERVICE } from '../../injection-tokens/jwt-authentication.token';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(JWT_AUTH_SERVICE) private jwtAuthService: JWTAuthenticationService,
    private jwtHelperService: JwtHelperService,
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
    return sessionStorage.getItem('token') || '';
  }

  tokenIsValid() {
    const token = sessionStorage.getItem('token');
    return (
      token != null &&
      token != '' &&
      token != 'null' &&
      !this.jwtHelperService.isTokenExpired(token)
    );
  }

  logOut() {
    this.jwtAuthService.logOut();
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
