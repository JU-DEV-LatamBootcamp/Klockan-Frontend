import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  baseRoute = 'http://localhost:3000/';

  constructor(protected http : HttpClient) { }

  abstract edit(entity: T): Observable<T>;
  abstract delete(entity : T): Observable<T>;
}
