import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import {
  DeleteConfirmationComponent,
  DeleteConfirmationComponentData,
} from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import {
  ErrorMessageComponent,
  ErrorMessageComponentData,
} from 'src/app/shared/components/error-message/error-message.component';

@Injectable({
  providedIn: null,
})
export class DialogService {
  private _config = {
    panelClass: 'dialog__container',
    maxWidth: 'auto',
  };

  constructor(private readonly dialog: MatDialog) {}

  show<T>(component: ComponentType<T> | TemplateRef<T>) {
    // IMPROVEMENT: should receive the component and wrap it with the dialog component, if its a small screen then open the component in the panel
    const dialogRef = this.dialog.open(component, this._config);
    return dialogRef.afterClosed();
  }

  // IMPROVEMENT: set generic constraints to not depend on 'DeleteConfirmationComponent' types
  showDeleteConfirmation<T>(
    component: ComponentType<DeleteConfirmationComponent<T>>,
    data: DeleteConfirmationComponentData<T>
  ) {
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }

  // IMPROVEMENT: same as above
  showErrorMessage(
    component: ComponentType<ErrorMessageComponent>,
    data: ErrorMessageComponentData
  ) {
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }
}
