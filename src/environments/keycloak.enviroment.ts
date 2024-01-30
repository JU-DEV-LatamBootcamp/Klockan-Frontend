export const environment = {
  production: false,
  apiBasePath: `https://localhost:5001/api`,
  resourceServerId: 'api',
  keycloak: {
    issuer: 'http://localhost:8080/realms/Klockan',
    redirectUri: 'http://localhost:4200/',
    realm: 'Klockan',
    clientId: 'frontend',
    scope: 'openid profile email',
  },
  api: {
    programsEndpoint: '/v1/programs',
    coursesEndpoint: '/v1/courses',
  },
};
