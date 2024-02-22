import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
    public readonly router: Router,
    public readonly screenSizeService: ScreenSizeService,
    public readonly panelService: PanelService,
    public readonly oPanelService: OPanelService,
    public readonly dialogService: DialogService,
    public readonly notificationService: NotificationService
  ) {}

  async ngOnInit() {
    const token = this._authService.token;

    const payload = this._authService.getPayloadFromToken(token);
    if (!payload) return;

    this.username = this._authService.getUsername(payload);
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
