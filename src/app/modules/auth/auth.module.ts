import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { AuthLayoutModule } from 'src/app/shared/layouts/auth-layout/auth-layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AuthLayoutModule,
    MatToolbarModule,
    LoginComponent,
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
