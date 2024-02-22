// jwt-authentication.token.ts
import { InjectionToken } from '@angular/core';
import { JWTAuthenticationService } from '../services/models/jwtauthentication-service';

export const JWT_AUTH_SERVICE = new InjectionToken<JWTAuthenticationService>(
  'JWTAuthenticationService'
);
