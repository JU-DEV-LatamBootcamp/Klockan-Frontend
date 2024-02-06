import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type ErrorMessageComponentData = {
  title: string;
  detail: string;
};

@Component({
  selector: 'app-error-message.component',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.sass'],
})
export class ErrorMessageComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorMessageComponentData
  ) {}
}
