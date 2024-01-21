import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components/notification/notification.component';

// TODO: create a module for each layout
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.sass'],
})
export class AppLayoutComponent {
  durationInSeconds = 5;
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // TODO: if its already with content change stack notifications till they are closed
  openSnackBar() {
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
