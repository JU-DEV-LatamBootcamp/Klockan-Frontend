import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { KeycloakService } from 'src/app/modules/auth/services/keycloak/keycloak.service';
import { BASE_PROFILE, PROFILE_FIELDS } from './profile.constants';
import { Profile, ProfileField } from './profile.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;

  userDetails: Profile = BASE_PROFILE;
  infoFields: ProfileField[] = PROFILE_FIELDS;

  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.initializeUserProfile();
  }

  private initializeUserProfile(): void {
    if (!this.keycloakService.token) {
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
}
