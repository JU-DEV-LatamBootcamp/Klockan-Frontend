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
