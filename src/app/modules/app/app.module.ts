import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { AppLayoutModule } from 'src/app/shared/layouts/app-layout/app-layout.module';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
// components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { UsersComponent } from './pages/users/users.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    AppLayoutModule,
    PortalModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    TableComponent,
  ],
  declarations: [
    DashboardComponent,
    ComposedLayoutComponent,
    MeetingsComponent,
    ProfileComponent,
    CoursesComponent,
    ProgramsComponent,
    UsersComponent,
    ClassroomsComponent,
  ],
})
export class AppModule {}
