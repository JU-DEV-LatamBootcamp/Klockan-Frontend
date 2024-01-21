import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './layouts/app-layout/components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationComponent } from './layouts/app-layout/components/notification/notification.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// TODO: move shared dependencies to the shared module
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  declarations: [
    AppLayoutComponent,
    DashboardComponent,
    DialogComponent,
    NotificationComponent,
  ],
})
export class AppModule {}
