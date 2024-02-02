import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  show<T>(
    component: ComponentType<T> | TemplateRef<T>,
    dataFromEvent?: any
  ): Observable<any> {
    // IMPROVEMENT: should receive the component and wrap it with the dialog component, if its a small screen then open the component in the panel
    const dialogRef = this.dialog.open(component, {
      panelClass: 'dialog__container',
      maxWidth: 'auto',
      data: dataFromEvent,
    });
    return dialogRef.afterClosed();
  }
}
