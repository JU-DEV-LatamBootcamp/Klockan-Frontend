export type KeycloakTokenPayload = {
  preferred_username: string;
  name: string;
  email: string;
  family_name: string;
  given_name: string;
};

export interface ProfileFromKeycloak {
  name: string;
  email: string;
  familyName: string;
  givenName: string;
  userName: string;
}
