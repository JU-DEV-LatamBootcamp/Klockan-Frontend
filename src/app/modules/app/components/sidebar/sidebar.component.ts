import { Component } from '@angular/core';
import { sidebarLinks } from './sidebar-component.constants';
import { KeycloakService } from 'src/app/modules/auth/services/keycloak/keycloak.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  links = sidebarLinks;

  constructor(private readonly keycloakService: KeycloakService) {}

  onLogOut() {
    this.keycloakService.logOut();
  }
}
