export const environment = {
  production: false,
  apiBasePath: `https://localhost:5001/api`,
  resourceServerId: 'api',
  keycloak: {
    issuer: 'https://localhost:8443/realms/Klockan',
    redirectUri: 'https://localhost/',
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
    schedulesEndpoint: (classroomId: number) =>
      `/v1/classrooms/${classroomId}/schedules`,
    classroomUsersEndpoint: (classroomId: number) =>
      `/v1/classrooms/${classroomId}/users`,
  },
};
