import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BASE_PROFILE } from './profile.constants';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';
import { ProfileFromKeycloak } from 'src/app/core/services/keycloak/keycloak.types';
import { UserFlat } from 'src/app/shared/models/User';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { mapUserToFlatObject } from 'src/app/shared/utils/mapUserToFlatObject';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { UserFormComponent } from '../users/components/user-form/user-form.component';
import {
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent {
  keycloackProfile!: ProfileFromKeycloak | null;
  userDetails: Profile = BASE_PROFILE; // just for default avatar image
  currentUser!: UserFlat;

  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly profileService: ProfileService,
    private readonly oPanelService: OPanelService,
    private readonly dialogService: DialogService,
    public readonly snackBar: MatSnackBar
  ) {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.profileService
      .getUserByEmail(this.keycloakService.getUserDetails()?.email)
      .subscribe(result => {
        this.currentUser = mapUserToFlatObject(result);
      });
  }

  showEditProfileForm(user: UserFlat) {
    this.dialogService
      .show(UserFormComponent, user ?? null)
      .subscribe(result => {
        if (result) {
          this.displayCreateSnackbar(result);
          this.fetchUsers();
        }
      });
  }
  fetchUsers() {
    throw new Error('Method not implemented.');
  }

  private displayCreateSnackbar({ firstName, lastName }: UserFlat): void {
    this.displaySnackbar(
      `User ${firstName} ${lastName} edited.`,
      SNACKBAR_SUCCESS_DEFAULTS
    );
  }

  private displaySnackbar(message: string, customConfig: SnackbarConfig): void {
    this.snackBar.open(
      message,
      customConfig.CLOSE_BUTTON_TEXT,
      customConfig.CONFIG
    );
  }

  public goBack(): void {
    this.oPanelService.toggle();
  }
}
