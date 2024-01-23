import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ScreenSizeService } from '../screen-size/screen-size.service';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: null,
  deps: [],
})
export class NotificationService {
  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _screenSizeService: ScreenSizeService
  ) {}

  private get _notificationConfig(): MatSnackBarConfig {
    return {
      duration: 4 * 1000,
      verticalPosition:
        this._screenSizeService.screenSize === 'xsmall' ? 'top' : 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notification__container',
    };
  }

  popFromComponent<T>(component: ComponentType<T>) {
    this._snackBar.openFromComponent(component, this._notificationConfig);
  }

  popFromTemplate<T>(template: TemplateRef<T>) {
    this._snackBar.openFromTemplate(template, this._notificationConfig);
  }
}
