import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterModule } from '@angular/router';
import { NotificationService } from './services/notification/notification.service';
import { ScreenSizeService } from './services/screen-size/screen-size.service';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  providers: [ScreenSizeService, NotificationService],
  declarations: [AuthLayoutComponent, NotificationComponent],
  exports: [AuthLayoutComponent, NotificationComponent],
})
export class AuthLayoutModule {}
