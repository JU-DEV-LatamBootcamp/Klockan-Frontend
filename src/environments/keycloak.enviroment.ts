export const environment = {
  production: false,
  apiBasePath: `${window.location}:5001/api`,
  // apiBasePath: `https://localhost:5001/api`,
  resourceServerId: 'api',
  keycloak: {
    issuer: `${window.location.origin}:8080/realms/Klockan`,
    // issuer: 'http://localhost:8080/realms/Klockan',
    redirectUri: `${window.location.origin}:4200/`,
    // redirectUri: 'https://localhost:4200/',
    realm: 'Klockan',
    clientId: 'frontend',
    scope: 'openid profile email',
  },
  api: {
    programsEndpoint: '/v1/programs',
    coursesEndpoint: '/v1/courses',
    meetingsEndpoint: '/v1/meetings',
  },
};
