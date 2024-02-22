export interface JWTAuthenticationService {
  getToken(): string;
  getPreferredUsernameFromPayload(payload: unknown): string | null;
  getPayloadFromToken(token: string): unknown;
  loginAndGetToken(): Promise<string>;
  logOut(): void;
  tokenIsValid(): boolean;
}
