// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
// components
import { AppLayoutComponent } from './app-layout.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
// services
import { AppLayoutStream } from './streams/app-layout/app-layout.stream';
import { PanelBridgeStream } from './streams/panel-bridge/panel-bridge.stream';
import { OPanelBridgeStream } from './streams/o-panel-bridge/o-panel-bridge.stream';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { SidebarService } from './services/sidebar/sidebar.service';
import { PanelService } from './services/panel/panel.service';
import { OPanelService } from './services/o-panel/o-panel.service';
import { DialogService } from './services/dialog/dialog.service';
import { NotificationService } from './services/notification/notification.service';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PortalModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  providers: [
    AppLayoutStream,
    PanelBridgeStream,
    OPanelBridgeStream,
    ScreenSizeService,
    SidebarService,
    PanelService,
    OPanelService,
    DialogService,
    NotificationService,
  ],
  declarations: [AppLayoutComponent, DialogComponent, NotificationComponent],
  exports: [AppLayoutComponent, DialogComponent, NotificationComponent],
})
export class AppLayoutModule {}
