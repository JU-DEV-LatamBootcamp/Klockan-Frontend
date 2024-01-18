import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { ThirdPartyAuthService } from '../../services/third-party-auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: { login: () => of({ token: 'fakeToken' }) },
        },
        { provide: ThirdPartyAuthService, useValue: {} },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.usernameFormControl).toBeTruthy();
    expect(component.passwordFormControl).toBeTruthy();
  });

  it('should call AuthService.login on login()', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(of({ token: 'fakeToken' }));

    component.usernameFormControl.setValue('testUser');
    component.passwordFormControl.setValue('testPassword');
    component.login();

    expect(authService.login).toHaveBeenCalledWith(
      new LoginModel('testUser', 'testPassword')
    );
  });

  it('should invalidate the form if username is too short', () => {
    component.usernameFormControl.setValue('ab'); // Assuming the minimum length is 3
    expect(component.usernameFormControl.valid).toBe(false);
  });

  it('should invalidate the form if password is too short', () => {
    component.passwordFormControl.setValue('123'); // Assuming the minimum length is 6
    expect(component.passwordFormControl.valid).toBe(false);
  });

  it('should invalidate the form if password is too long', () => {
    const longPassword = 'A'.repeat(17); // Assuming the maximum length is 16
    component.passwordFormControl.setValue(longPassword);
    expect(component.passwordFormControl.valid).toBe(false);
  });

  it('should have a valid form if inputs are within length limits', () => {
    component.usernameFormControl.setValue('validUser');
    component.passwordFormControl.setValue('validPassword');
    expect(component.usernameFormControl.valid).toBe(true);
    expect(component.passwordFormControl.valid).toBe(true);
  });
});
