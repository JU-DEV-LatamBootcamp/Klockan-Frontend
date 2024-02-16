import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/layouts/auth-layout/services/notification/notification.service';
import { AuthLayoutModule } from 'src/app/shared/layouts/auth-layout/auth-layout.module';

import { NotificationComponent } from 'src/app/shared/layouts/app-layout/components/notification/notification.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
    MatProgressSpinnerModule,
    MatInputModule,
    AuthLayoutModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
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
  user: unknown;
  token = '';
  @ViewChild('notification')
  notificationRef?: TemplateRef<NotificationComponent>;

  constructor(
    public readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.login();
  }
}
