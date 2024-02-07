import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { KeycloakService } from 'src/app/modules/auth/services/keycloak/keycloak.service';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { NotificationService } from 'src/app/shared/layouts/app-layout/services/notification/notification.service';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';
import { PanelService } from 'src/app/shared/layouts/app-layout/services/panel/panel.service';
import { ScreenSizeService } from 'src/app/shared/layouts/app-layout/services/screen-size/screen-size.service';
import { SidebarService } from 'src/app/shared/layouts/app-layout/services/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(CdkPortal, { static: true }) cdkPortalTemplate?: CdkPortal;
  username: string | null = 'Regular User';

  constructor(
    private readonly _authService: AuthService,
    private readonly _keycloakService: KeycloakService,
    public readonly router: Router,
    public readonly screenSizeService: ScreenSizeService,
    public readonly panelService: PanelService,
    public readonly oPanelService: OPanelService,
    public readonly dialogService: DialogService,
    public readonly notificationService: NotificationService
  ) {}

  async ngOnInit() {
    await this._keycloakService.configureSingleSingOn();
    const token = this._keycloakService.token;

    if (!token) {
      this.router.navigate(['/auth']);
      return;
    }

    const payload = this._keycloakService.getPayloadFromToken(token);
    if (!payload) return;

    this.username = this._keycloakService.getPreferredUsername(payload);
  }

  openPanelFromComponent() {
    this.panelService.openFromComponent(DashboardComponent);
    this.panelService.toggle();
  }

  openOPanelFromTemplate() {
    if (!this.cdkPortalTemplate) return;

    this.oPanelService.openFromTemplate(this.cdkPortalTemplate);
    this.oPanelService.toggle();
  }

  openOPanelFromComponent() {
    this.oPanelService.openFromComponent(DashboardComponent);
    this.oPanelService.toggle();
  }

  showDialogFromComponent() {
    this.dialogService.show(DashboardComponent);
  }
}
