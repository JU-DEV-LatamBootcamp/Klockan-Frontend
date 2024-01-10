// home.component.ts

import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authConfig } from 'src/app/shared/config/keycloak.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  headers: HttpHeaders | undefined;
  token: string | null = null;

  constructor(
    private oAuthService: OAuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.configureSingleSingOn();
    this.token = this.oAuthService.getAccessToken();
    console.log(this.token);
  }

  configureSingleSingOn() {
    // Assuming you have authConfig defined somewhere
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  logout() {
    // Implement your logout logic here, e.g., clear the token and navigate to the login page
    this.oAuthService.logOut();
    // Additional logout logic if needed
  }
}
