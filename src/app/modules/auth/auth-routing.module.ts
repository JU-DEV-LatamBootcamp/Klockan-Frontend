import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { afterLoginGuard } from 'src/app/core/guards/afterLogin/after-login.guard';

const routes: Routes = [
  {
    path: '',
    component: ComposedLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
    canActivate: [afterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
