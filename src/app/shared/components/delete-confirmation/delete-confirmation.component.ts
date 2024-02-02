import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDeleteConfirmationData } from '../../interfaces/IDeleteConfirmationData';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.sass'],
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteConfirmationData<any>
  ) {}

  confirm() {
    const { item, service } = this.data;
    service.delete(item);
    this.dialogRef.close();
  }
}
