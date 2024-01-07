import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThirdPartyAuthService } from '../../services/third-party-auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  standalone: true,
  providers: [AuthService, ThirdPartyAuthService],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private thirdpartyAuth: ThirdPartyAuthService,
    private router: Router
  ) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);

  repeatPasswordFormControl = this.fb.control('', [
    Validators.required,
    this.passwordMatchValidator(),
  ]);

  checkboxFormControl = new FormControl(false, [Validators.requiredTrue]);

  isFormSubmitted = false;

  navigate(param: string) {
    this.router.navigate([param]);
  }

  private passwordMatchValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.passwordFormControl.value;
      const repeatPassword = control.value;

      return password === repeatPassword ? null : { mismatch: true };
    };
  }

  onSubmit() {
    this.isFormSubmitted = true;

    // Additional logic for form submission
    if (
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.repeatPasswordFormControl.valid &&
      this.checkboxFormControl.valid
    ) {
      // Perform registration or other actions
      console.log('Form submitted successfully!');
    }
  }
}
