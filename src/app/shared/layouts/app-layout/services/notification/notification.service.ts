import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  // IMPROVEMENT: refactorize variables
  popFromComponent<T>(component: ComponentType<T>) {
    this._snackBar.openFromComponent(component, {
      duration: 5 * 1000,
      verticalPosition:
        this._screenSizeService.screenSize === 'xsmall' ? 'top' : 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notification__container',
    });
  }

  popFromTemplate<T>(template: TemplateRef<T>) {
    this._snackBar.openFromTemplate(template, {
      duration: 5 * 1000,
      verticalPosition:
        this._screenSizeService.screenSize === 'xsmall' ? 'top' : 'bottom',
      horizontalPosition: 'right',
      panelClass: 'notification__container',
    });
  }
}
