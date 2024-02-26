export const environment = {
  production: true,
  apiBasePath: `https://ec2-18-116-68-43.us-east-2.compute.amazonaws.com:5001/api`,
  resourceServerId: 'api',
  keycloak: {
    issuer: `https://ec2-18-116-68-43.us-east-2.compute.amazonaws.com:8443/realms/Klockan`,
    redirectUri: `https://ec2-18-116-68-43.us-east-2.compute.amazonaws.com/`,
    realm: 'Klockan',
    clientId: 'frontend',
    scope: 'openid profile email',
  },
  api: {
    programsEndpoint: '/v1/programs',
    coursesEndpoint: '/v1/courses',
    classroomsEndpoint: '/v1/classrooms',
    meetingsEndpoint: '/v1/meetings',
    usersEndpoint: '/v1/users',
    countriesEndpoint: '/v1/countries',
  },
};
