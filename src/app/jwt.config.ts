import {JwtModule} from '@auth0/angular-jwt';

/*
  Configure JWT library.
  This will handle adding the correct Authorization header to certain routes,
  every other aspect of Authentication is handled by our own AuthService.
 */

const whiteListedDomains = ['localhost:3000'];
const blacklistedRoutes = ['localhost:3000/api/users/login'];

const JWT_CONFIG = JwtModule.forRoot({
  config: {
    tokenGetter: () => localStorage.getItem('stagecoach.token'),
    whitelistedDomains: whiteListedDomains,
    blacklistedRoutes: blacklistedRoutes
  }
});

export const JWT = JWT_CONFIG;
