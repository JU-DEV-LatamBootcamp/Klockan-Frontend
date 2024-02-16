import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './shared/config/keycloak.config';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpClientModule } from '@angular/common/http';
import { authServiceFactory } from './core/factories/auth-service.factory';
import { JWT_AUTH_SERVICE } from './core/injection-tokens/jwt-authentication.token';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: { tokenGetter: () => sessionStorage.getItem('token') }, // Example token getter
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER, // Use APP_INITIALIZER for root-level initialization
      useFactory: (oAuthService: OAuthService) => async () => {
        oAuthService.configure(authConfig);
        oAuthService.tokenValidationHandler = new JwksValidationHandler();
      },
      deps: [OAuthService], // Inject OAuthService
      multi: true, // Allow multiple initializers if needed
    },
    {
      provide: JWT_AUTH_SERVICE,
      useFactory: authServiceFactory,
      deps: [OAuthService],
    },
    AuthorizationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
