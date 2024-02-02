import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';

@Component({
  selector: 'app-error-message.component',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.sass'],
})
export class ErrorMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly dialogService: DialogService
  ) {}
}
