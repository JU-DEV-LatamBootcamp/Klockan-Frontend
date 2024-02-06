import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/keycloak.enviroment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  baseRoute = environment.apiBasePath;

  constructor(
    protected http: HttpClient,
    protected oAuthService: OAuthService
  ) {}

  abstract getAll(entity: T): Observable<T[]>;
  abstract create(entity: T): Observable<T>;
  abstract edit(entity: T): Observable<T>;
  abstract delete(entity: T): Observable<T>;

  protected createHeaders(token: string): HttpHeaders {
    const authToken = token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });

    return headers;
  }
}
