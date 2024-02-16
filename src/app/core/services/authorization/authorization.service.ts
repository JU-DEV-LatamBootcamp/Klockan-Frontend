import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  userIsLoggedIn() {
    if (this.authService.token) {
      if (this.isTokenValid()) {
        return true;
      } else {
        this.authService.logOut();
      }
    }
    return false;
  }

  isTokenValid(): boolean {
    try {
      return !this.jwtHelper.isTokenExpired(this.authService.token, 50);
    } catch (error) {
      return false;
    } // add more validations in the future
  }

  // Get user information from the token
  getUserFromToken(): string | null {
    return this.jwtHelper.decodeToken(this.authService.token || '') || null;
  }
}
