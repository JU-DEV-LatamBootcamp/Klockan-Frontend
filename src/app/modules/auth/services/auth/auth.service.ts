import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyToken(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .get(`${environment.apiBasePath}/WeatherForecast`, { headers })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            return throwError(() => new Error('Unauthorized', error));
          }
          return throwError(() => new Error(error));
        })
      );
  }
}
