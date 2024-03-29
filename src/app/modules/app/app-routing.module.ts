import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { UsersComponent } from './pages/users/users.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { validateRoleGuard } from 'src/app/core/guards/validate-role/validate-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ComposedLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [validateRoleGuard],
      },
      {
        path: 'programs',
        component: ProgramsComponent,
        canActivate: [validateRoleGuard],
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'classrooms',
        component: ClassroomsComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
