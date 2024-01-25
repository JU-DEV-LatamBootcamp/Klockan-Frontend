import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UsersComponent } from './pages/users/users.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { HomeComponent } from '../home/components/home/home.component';

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
      },
      {
        path: 'programs',
        component: ProgramsComponent,
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'classrooms',
        component: ClassroomsComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
