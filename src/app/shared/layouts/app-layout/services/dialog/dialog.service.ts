import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: null,
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  show<T>(component: ComponentType<T> | TemplateRef<T>, dataFromEvent?: any) {
    // IMPROVEMENT: should receive the component and wrap it with the dialog component, if its a small screen then open the component in the panel
    this.dialog.open(component, {
      panelClass: 'dialog__container',
      maxWidth: 'auto',
      data: dataFromEvent,
    });
  }
}
