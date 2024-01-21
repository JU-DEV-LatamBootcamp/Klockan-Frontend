import {
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';
import { ScreenSize, ScreenSizeService } from './services/screen-size.service';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';

// TODO: create a module for each layout
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent implements OnDestroy {
  // IMPROVEMENT: find good practices to view child properties
  @ViewChild('sidebar', { static: false }) private _sidebar?: MatDrawer;
  @ViewChild('panel', { static: false }) private _panel?: MatDrawer;
  @ViewChild('oPanel', { static: false }) private _oPanel?: MatDrawer;
  public screenSize: ScreenSize = 'unknown';

  constructor(
    private _snackBar: MatSnackBar,
    public screenSizeService: ScreenSizeService,
    public dialog: MatDialog
  ) {
    this.screenSizeService.screenSize$.subscribe(size => {
      this.screenSize = size;
      this._setSidebarDefaults();
    });
  }

  toggleSidebar() {
    if (!this._sidebar) return;

    if (
      this.screenSizeService.matchEqualOrAbove('large') &&
      this._sidebar.opened
    )
      return;

    this._sidebar?.toggle();
  }

  // TODO: open and toggle must be separate
  openPanel() {}

  togglePanel() {
    this._panel?.toggle();
  }

  // TODO: open and toggle must be separate
  openOPanel() {}

  toggleOPanel() {
    this._oPanel?.toggle();
  }

  // TODO: open and toggle must be separate
  openDialog() {
    // TODO: should receive the component and wrap it with the dialog component, if its a small screen then open the component in the panel
    this.dialog.open(DialogComponent, {
      panelClass: 'dialog__container',
      maxWidth: 'auto',
    });
  }
  // openDialog() {
  //   this.dialog.open<string>(DialogComponent, {
  //     width: '250px',
  //   });
  // }

  // TODO: if its already with content change stack notifications till they are closed
  popNotification() {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: 60 * 1000,
      verticalPosition:
        this.screenSizeService.screenSize === 'xsmall' ? 'top' : 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notification__container',
    });
  }

  ngOnDestroy() {
    // destroy secreen size observer
    this.screenSizeService.destroy();
  }

  private _setSidebarDefaults() {
    if (!this._sidebar) return;

    if (this.screenSizeService.matchEqualOrAbove('large')) {
      if (!this._sidebar.opened) {
        this._sidebar.open();
      }

      return;
    }

    if (this._sidebar.opened) {
      this._sidebar.close();
    }
  }
}
