import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDeleteConfirmationData } from '../../interfaces/IDeleteConfirmationData';
import { Subscription, Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.sass'],
})
export class DeleteConfirmationComponent implements OnDestroy {
  subscription!: Subscription;
  itemDeleted$!: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteConfirmationData<any>,
    public readonly dialogService: DialogService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  confirm() {
    const { item, service } = this.data;
    this.itemDeleted$ = service.delete(item);
    this.subscription = this.itemDeleted$.subscribe({
      next: item => {
        this.dialogRef.close(item);
      },
      error: error => {
        this.dialogRef.close();
        this.dialogService.show(ErrorMessageComponent, error.error);
      },
    });
  }
}
