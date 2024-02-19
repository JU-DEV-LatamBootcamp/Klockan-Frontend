import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';
import { afterLoginGuard } from 'src/app/core/guards/afterLogin/after-login.guard';

const routes: Routes = [
  {
    path: '',
    component: ComposedLayoutComponent,
    /*children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],*/
    //Code above is managed by guards, login component is no longer used, keycloak only
    canActivate: [afterLoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
