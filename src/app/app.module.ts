import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { HomeModule } from './modules/home/home.module';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableComponent } from './shared/components/table/table.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    LoginComponent,
    OAuthModule.forRoot(),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
