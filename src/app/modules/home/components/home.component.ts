// home.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/shared/config/keycloak.config';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;


  token: string | null = null;
  isSidenavOpen = true;

  constructor(
    private oAuthService: OAuthService,
    private router: Router,
    private tokenService : TokenService
  ) {}

  username : string | null = "Usuario promedio";

  async ngOnInit() {
    console.log("Entrando al keycloack");
    try {
      await this.configureSingleSingOn();
      this.token = this.oAuthService.getAccessToken();
      if (this.token == null) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.username = this.tokenService.getPreferredUsername(this.token);
    }	
    catch(error) {
      console.log(error);
    }
  }

  async configureSingleSingOn() {
    // Assuming you have authConfig defined somewhere
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  toggleSidenav() {
    this.sidenav!.toggle();
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    // Implement your logout logic here, e.g., clear the token and navigate to the login page
    this.oAuthService.logOut();
    // Additional logout logic if needed
  }
}
