import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThirdPartyAuthService } from '../../services/third-party-auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  standalone: true,
  imports: [MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService, ThirdPartyAuthService]
})



export class LoginComponent {

  constructor(private service : AuthService, private thirdpartyAuth : ThirdPartyAuthService, private router : Router) { 
    
  }

  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);

  login(){
    let username = this.usernameFormControl.value!;
    let password = this.passwordFormControl.value!;
    let loginModel : LoginModel = new LoginModel(username, password);
    this.service.login(loginModel).subscribe((data : any) => {
      console.info(data);
      localStorage.setItem('token', data.token);
      this.router.navigate(['home']);
    }, (error : any) => {
      console.warn(error);
    });
  }

  autenticacion(context : string){
    switch(context){
      case 'facebook':
        this.thirdpartyAuth.facebookAuth();
        break;
      case 'google':
        this.thirdpartyAuth.googleAuth();
        break;
      case 'twitter':
        this.thirdpartyAuth.twitterAuth();
        break;
    }
  }
  navigate(param : string){
    this.router.navigate([param]);
  }
}
