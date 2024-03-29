import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { userTypeColumns, roleData } from './users.constants';
import { DialogService } from '../../../../shared/layouts/app-layout/services/dialog/dialog.service';
import { User, UserFlat } from '../../../../shared/models/User';
import { UserService } from '../../../../shared/services/user.service';
import { mapUserToFlatObject } from '../../../../shared/utils/mapUserToFlatObject';
import { UserFormComponent } from './components/user-form/user-form.component';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';
import { TableComponentCommonColumns } from 'src/app/shared/components/table/table-component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;

  public isSidenavOpen = true;
  public isLoading = true;
  userRoles: string[] | undefined;
  columns = userTypeColumns;
  commonColumns: TableComponentCommonColumns;
  users: UserFlat[] = [];

  constructor(
    private readonly dialogService: DialogService,
    private readonly userService: UserService,
    private readonly keycloakService: KeycloakService,
    public readonly snackBar: MatSnackBar
  ) {
    this.userRoles = keycloakService.getUserDetails()?.roles;
    this.commonColumns = this.userRoles?.includes('admin')
      ? roleData.admin
      : roleData.trainer;
    this.fetchUsers();
  }

  public fetchUsers() {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(users: User[]): void {
    this.users = this.mapUsersToFlatObject(users);
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
    this.displaySnackbar(API_ERROR_MESSAGE, SNACKBAR_ERROR_DEFAULTS);
  }

  private displaySnackbar(message: string, customConfig: SnackbarConfig): void {
    this.snackBar.open(
      message,
      customConfig.CLOSE_BUTTON_TEXT,
      customConfig.CONFIG
    );
  }

  public showFormDialog(user?: User): void {
    this.dialogService
      .show(UserFormComponent, user ?? null)
      .subscribe(result => {
        if (result) {
          this.displayCreateSnackbar(result);
          this.fetchUsers();
        }
      });
  }

  public showDeleteDialog(item: UserFlat): void {
    return;
  }

  public showEditDialog(item: UserFlat): void {
    return;
  }

  private displayCreateSnackbar({ firstName, lastName }: User): void {
    this.displaySnackbar(
      `User ${firstName} ${lastName} created.`,
      SNACKBAR_SUCCESS_DEFAULTS
    );
  }

  mapUsersToFlatObject(users: User[]): UserFlat[] {
    return users.map(user => mapUserToFlatObject(user));
  }
}
