import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/shared/config/keycloak.config';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-composed-layout',
  templateUrl: './composed-layout.component.html',
  styleUrls: ['./composed-layout.component.sass'],
})
export class ComposedLayoutComponent implements OnInit {
  constructor(
    public readonly screenSizeService: ScreenSizeService,
    public readonly sidebarService: SidebarService,
    private oAuthService: OAuthService,
    private router: Router
  ) {}

  token: string | null = null;

  async ngOnInit() {
    try {
      await this.configureSingleSingOn();
      this.token = this.oAuthService.getAccessToken();
      if (this.token == null) {
        this.router.navigate(['/login']);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async configureSingleSingOn() {
    // Assuming you have authConfig defined somewhere
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  doLogout() {
    this.oAuthService.logOut();
  }
}
