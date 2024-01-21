import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutModule } from 'src/app/shared/layouts/app-layout/app-layout.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [CommonModule, AppRoutingModule, AppLayoutModule],
  declarations: [DashboardComponent],
})
export class AppModule {}
