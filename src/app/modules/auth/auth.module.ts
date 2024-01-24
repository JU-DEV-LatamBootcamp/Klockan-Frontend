import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { AuthLayoutModule } from 'src/app/shared/layouts/auth-layout/auth-layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppLayoutModule } from 'src/app/shared/layouts/app-layout/app-layout.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AuthLayoutModule,
    OAuthModule.forRoot(),
    MatToolbarModule,
    // components
    LoginComponent,
    RegisterComponent,
  ],
  declarations: [ComposedLayoutComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class AuthModule {}
