import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export type DeleteConfirmationComponentData<T> = {
  item: T;
  identifier: keyof T;
};

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.sass'],
})
export class DeleteConfirmationComponent<T> {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteConfirmationComponentData<T>
  ) {}
}
