export const environment = {
  production: false,
  apiBasePath: `http://localhost:5037/WeatherForecast`,
  resourceServerId: 'api',
  keycloak: {
    issuer: 'http://localhost:8080/realms/Atendance_App',
    redirectUri: 'http://localhost:4200/',
    realm: 'Atendance_App',
    clientId: 'angular_app',
    scope: 'openid profile email',
  },
};
