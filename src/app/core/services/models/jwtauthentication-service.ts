import {
  KeycloakTokenPayload,
  ProfileFromKeycloak,
} from '../keycloak/keycloak.types';

export interface JWTAuthenticationService {
  getToken(): string;
  getPreferredUsernameFromPayload(payload: KeycloakTokenPayload): string | null;
  getUserDetails(): ProfileFromKeycloak | null;
  getPayloadFromToken(token: string): KeycloakTokenPayload | null;
  loginAndGetToken(): Promise<string>;
  logOut(): void;
  tokenIsValid(): boolean;
}
