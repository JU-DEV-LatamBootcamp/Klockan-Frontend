import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppLayoutComponent } from './app-layout.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NotificationComponent } from './components/notification/notification.component';

// TODO: move shared dependencies to the shared module
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [AppLayoutComponent, DialogComponent, NotificationComponent],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
