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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

// Components
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { UsersComponent } from './pages/users/users.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { ProgramFormComponent } from './pages/programs/components/program-form/program-form.component';
import { ClassroomFormComponent } from './pages/classrooms/components/classroom-form/classroom-form.component';

// Shared
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CourseFormComponent } from './pages/courses/components/course-form/course-form.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { UserFormComponent } from './pages/users/components/user-form/user-form.component';
import { MeetingFormComponent } from './pages/meetings/components/meeting-form/meeting-form.component';
import { UpdateUsersFormComponent } from './pages/classrooms/components/update-users-form/update-users-form.component';
import { MatCardModule } from '@angular/material/card';
import { MeetingCardDisplayComponent } from './pages/meetings/components/meeting-card-display/meeting-card-display.component';

@NgModule({
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
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
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
  ],
  declarations: [
    ButtonComponent,
    DashboardComponent,
    ComposedLayoutComponent,
    MeetingsComponent,
    ProfileComponent,
    CoursesComponent,
    ProgramsComponent,
    UsersComponent,
    ClassroomsComponent,
    CourseFormComponent,
    DeleteConfirmationComponent,
    ErrorMessageComponent,
    ProgramFormComponent,
    NavbarComponent,
    SidebarComponent,
    MainHeaderComponent,
    UserFormComponent,
    ClassroomFormComponent,
    MeetingFormComponent,
    UpdateUsersFormComponent,
    MeetingCardDisplayComponent,
    MeetingCardDisplayComponent,
  ],
  exports: [DeleteConfirmationComponent],
})
export class AppModule {}
