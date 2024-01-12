import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThirdPartyAuthService } from '../../services/third-party-auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/keycloak.enviroment';
import { authConfig } from 'src/app/shared/config/keycloak.config';

/**
 * Componente que representa la interfaz de inicio de sesión.
 *
 * Este componente permite a los usuarios ingresar sus credenciales para iniciar sesión.
 * También incluye la opción de autenticación de terceros a través de plataformas como Facebook, Google y Twitter.
 *
 * @example
 * <app-login></app-login>
 *
 * @see {@link AuthService} - Servicio para manejar la autenticación del usuario.
 * @see {@link ThirdPartyAuthService} - Servicio para manejar la autenticación de terceros.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AuthService, ThirdPartyAuthService],
})
export class LoginComponent {
  /**
   * Constructor del componente de inicio de sesión.
   *
   * @param {AuthService} service - Servicio de autenticación de usuario.
   * @param {ThirdPartyAuthService} thirdpartyAuth - Servicio de autenticación de terceros.
   * @param {Router} router - Servicio de navegación entre vistas.
   */

  headers: HttpHeaders | undefined;
  readonly APIUrl = environment.apiBasePath;
  user: any;

  constructor(
    private thirdpartyAuth: ThirdPartyAuthService,
    private router: Router,
    private oAuthService: OAuthService,
  ) {}

  ngOnInit() {
    this.configureSingleSingOn();
    this.setToken();
  }

  setToken() {
    const token = this.oAuthService.getAccessToken();
    sessionStorage.setItem('token', token);
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    console.log('Bearer Token: ' + token);
    if (token != null) {
      this.navigate('/home');
    }
  }

  async configureSingleSingOn() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initLoginFlow();
    this.setToken();
  }
  /**
   * Control del formulario para el nombre de usuario.
   * @type {FormControl}
   */
  usernameFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  /**
   * Control del formulario para la contraseña.
   * @type {FormControl}
   */
  passwordFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);

  /**
   * Método llamado al intentar iniciar sesión.
   *
   * Recoge los valores del nombre de usuario y la contraseña,
   * crea un objeto `LoginModel` y utiliza el servicio `AuthService` para realizar la autenticación.
   */
  // login(): void {
  //   const username = this.usernameFormControl.value!;
  //   const password = this.passwordFormControl.value!;
  //   const loginModel: LoginModel = new LoginModel(username, password);
  //   this.service.login(loginModel).subscribe(
  //     (data: any) => {
  //       console.info(data);
  //       localStorage.setItem('token', data.token);
  //       this.router.navigate(['home']);
  //     },
  //     (error: any) => {
  //       console.warn(error);
  //     }
  //   );
  // }
  /**
   * Método para navegar a otra vista.
   *
   * @param {string} param - Ruta de navegación.
   */
  
  navigate(param: string) {
    this.router.navigate([param]);
  }
}
