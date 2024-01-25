export const environment = {
  production: false,
  apiBasePath: `http://localhost:5209/`,
  resourceServerId: 'api',
  keycloak: {
    issuer: 'http://localhost:8080/realms/Klockan',
    redirectUri: 'http://localhost:4200/',
    realm: 'Klockan',
    clientId: 'frontend',
    scope: 'openid profile email',
  },
  apiProgramsPath: 'api/v1/Program',
};
