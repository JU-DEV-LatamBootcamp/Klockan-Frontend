import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatButtonModule,
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
  ],
})
export class HomeModule {}
