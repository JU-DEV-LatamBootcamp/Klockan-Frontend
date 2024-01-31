import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThirdPartyAuthService } from '../../services/third-party-auth.service';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/keycloak.enviroment';
import { authConfig } from 'src/app/shared/config/keycloak.config';
import { NotificationService } from 'src/app/shared/layouts/auth-layout/services/notification/notification.service';
import { AuthLayoutModule } from 'src/app/shared/layouts/auth-layout/auth-layout.module';
import { NotificationComponent } from 'src/app/shared/layouts/auth-layout/components/notification/notification.component';

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
    AuthLayoutModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AuthService, ThirdPartyAuthService],
})
export class LoginComponent implements OnInit {
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
  token = '';
  @ViewChild('notification')
  notificationRef?: TemplateRef<NotificationComponent>;

  constructor(
    private thirdpartyAuth: ThirdPartyAuthService,
    private router: Router,
    private oAuthService: OAuthService,
    public readonly notificationService: NotificationService
  ) {}

  async ngOnInit() {
    try {
      await this.configureSingleSingOn();
      await this.setToken();
      this.token = this.oAuthService.getAccessToken();
      if (this.token != null) {
        this.navigate('/app/home');
      }else{
        this.login();
      }
    } catch (error) {
      if (!this.notificationRef) return;
      this.notificationService.popFromTemplate(this.notificationRef);
    }
  }

  async setToken() {
    setTimeout(() => {
      const token = this.oAuthService.getAccessToken();
      sessionStorage.setItem('token', token);
      this.headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
      if (token != null) {
        this.navigate('/app/home');
      }
    }, 500);
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
   * Método para navegar a otra vista.
   *
   * @param {string} param - Ruta de navegación.
   */

  navigate(param: string) {
    this.router.navigate([param]);
  }
}
