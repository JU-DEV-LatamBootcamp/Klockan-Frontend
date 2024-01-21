import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
})
export class NotificationComponent {
  snackBarRef = inject(MatSnackBarRef);
}
