import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateLoginGuard } from './core/guards/validateLogin/validate-login.guard';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () =>
      import('./modules/app/app.module').then(m => m.AppModule),
    canActivate: [validateLoginGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
