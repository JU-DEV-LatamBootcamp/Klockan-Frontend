import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { validateLoginGuard } from './core/guards/validate-login/validate-login.guard';
import { afterLoginGuard } from './core/guards/after-login/after-login.guard';

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
    canActivate: [afterLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
