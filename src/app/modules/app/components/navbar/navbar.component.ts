import { Component } from '@angular/core';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';
import { KeycloakService } from 'src/app/modules/auth/services/keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  constructor(
    private readonly keycloakService: KeycloakService,
    public readonly screenSizeService: ScreenSizeService,
    public readonly sidebarService: SidebarService
  ) {}

  onLogOut() {
    this.keycloakService.logOut();
  }
}
