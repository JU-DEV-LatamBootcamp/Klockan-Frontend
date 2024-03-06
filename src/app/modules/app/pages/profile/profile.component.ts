import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BASE_PROFILE, PROFILE_FIELDS } from './profile.constants';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  userDetails: Profile = BASE_PROFILE;
  infoFields: ProfileField[] = PROFILE_FIELDS;

  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly oPanelService: OPanelService
  ) {}

  ngOnInit(): void {
    this.initializeUserProfile();
  }

  private initializeUserProfile(): void {
    if (!this.keycloakService.getToken) {
      this.router.navigate(['/auth']);
    } else {
      this.setUserDetails();
    }
  }

  private setUserDetails(): void {
    const userDetails = this.keycloakService.getUserDetails();
    if (userDetails) {
      this.userDetails = { ...this.userDetails, ...userDetails };
    }
  }

  public goBack(): void {
    this.oPanelService.toggle();
  }

  public editProfile(): void {
    this.oPanelService.toggle();
    this.router.navigate(['app/edit-profile']);
  }
}
