import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/shared/config/keycloak.config';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenService } from '../services/token.service';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;

  token: string | null = null;
  isSidenavOpen = true;

  isLoading = false;
  apiResponse: any[] = [];

  constructor(
    private oAuthService: OAuthService,
    private router: Router,
    private tokenService: TokenService,
    private backendService: BackendService
  ) {}

  username: string | null = 'Usuario promedio';

  async ngOnInit() {
    try {
      await this.configureSingleSingOn();
      this.token = this.oAuthService.getAccessToken();
      if (this.token == null) {
        this.router.navigate(['/auth/login']);
        return;
      }
      this.username = this.tokenService.getPreferredUsername(this.token);
    } catch (error) {
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
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  logout() {
    // Implement your logout logic here, e.g., clear the token and navigate to the login page
    this.oAuthService.logOut();
    // Additional logout logic if needed
  }

  callApi() {
    this.isLoading = true;
    if (this.token == null) {
      console.error('Token not available');
      return;
    }
    try {
      this.backendService.getBackendData(this.token).subscribe(
        response => {
          this.apiResponse = response as any[];
          this.isLoading = false;
        },
        error => {
          console.warn('Error calling backend API', error);
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal, intenta nuevamente',
          });
        }
      );
    } catch (error) {
      this.isLoading = false;
    }
  }
}
