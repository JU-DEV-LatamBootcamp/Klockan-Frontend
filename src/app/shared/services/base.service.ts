import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> {
  baseRoute = environment.apiBasePath;

  constructor(protected http: HttpClient) {}

  abstract getAll(entity: T): Observable<T[]>;
  abstract create(entity: T): Observable<T>;
  abstract edit(entity: T): Observable<T>;
  abstract delete(entity: T): Observable<T>;
}
