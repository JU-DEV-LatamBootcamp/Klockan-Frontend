import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposedLayoutComponent } from './components/composed-layout/composed-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ComposedLayoutComponent,
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
