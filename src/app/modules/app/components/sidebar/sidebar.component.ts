import { Component } from '@angular/core';

import {
  SIDEBAR_LINKS,
  PROFILE_BUTTON,
  LOGOUT_BUTTON,
} from './sidebar-component.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  links = SIDEBAR_LINKS;
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
    private readonly oPanelService: OPanelService
  ) {}

  onLogOut() {
    this.authService.logOut();
  }

  openPanel() {
    this.oPanelService.openFromComponent(ProfileComponent);
    this.oPanelService.toggle();
  }
}
