import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import {
  DeleteConfirmationComponent,
  DeleteConfirmationComponentData,
} from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import {
  ErrorMessageComponent,
  ErrorMessageComponentData,
} from 'src/app/shared/components/error-message/error-message.component';
import { EditProgramComponentData, ProgramFormComponent } from 'src/app/modules/app/pages/programs/components/program-form/program-form.component';


@Injectable({
  providedIn: null,
})
export class DialogService {
  private _config = {
    panelClass: 'dialog__container',
    maxWidth: 'auto',
    autoFocus: false,
  };

  constructor(private readonly dialog: MatDialog) {}

  show<T>(
    component: ComponentType<T> | TemplateRef<T>,
    data?: any
  ): Observable<any> {
    // IMPROVEMENT: should receive the component and wrap it with the dialog component, if its a small screen then open the component in the panel
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }

  // IMPROVEMENT: set generic constraints to not depend on 'DeleteConfirmationComponent' types
  showDeleteConfirmation<T>(
    component: ComponentType<DeleteConfirmationComponent<T>>,
    data: DeleteConfirmationComponentData<T>
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }

  // IMPROVEMENT: same as above
  showErrorMessage(
    component: ComponentType<ErrorMessageComponent>,
    data: ErrorMessageComponentData
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }

  showEditDialog<T>(
    component: ComponentType<ProgramFormComponent>,
    data: EditProgramComponentData<T>
  ){
    const dialogRef = this.dialog.open(component, { ...this._config, data });
    return dialogRef.afterClosed();
  }
}
