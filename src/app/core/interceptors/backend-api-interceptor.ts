import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class BackendApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(environment.apiBasePath)) {
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token?.trim()}`,
        },
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
