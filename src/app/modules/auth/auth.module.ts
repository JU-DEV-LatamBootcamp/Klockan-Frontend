import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
