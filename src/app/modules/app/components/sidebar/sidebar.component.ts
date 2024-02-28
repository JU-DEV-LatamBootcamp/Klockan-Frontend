import { Component } from '@angular/core';

import {
  SIDEBAR_LINKS,
  PROFILE_BUTTON,
  LOGOUT_BUTTON,
  TRAINER_SIDEBAR_LINKS,
} from './sidebar-component.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  links: SidebarLink[];
  userRoles: string[] | undefined;
  buttons: SidebarButton[] = [
    {
      ...PROFILE_BUTTON,
      action: this.openPanel.bind(this),
    },
    {
      ...LOGOUT_BUTTON,
      action: this.onLogOut.bind(this),
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly keycloakService: KeycloakService,
    private readonly oPanelService: OPanelService
  ) {
    this.userRoles = keycloakService.getUserDetails()?.roles;
    this.links = this.userRoles?.includes('admin')
      ? SIDEBAR_LINKS
      : TRAINER_SIDEBAR_LINKS;
  }

  onLogOut() {
    this.authService.logOut();
  }

  openPanel() {
    this.oPanelService.openFromComponent(ProfileComponent);
    this.oPanelService.toggle();
  }
}
