import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  usersPath = environment.api.usersEndpoint;

  override getAll(): Observable<User[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<User[]>(this.baseRoute + this.usersPath, {
      headers,
    });
  }

  override create(entity: User): Observable<User> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);

    return this.http.post<User>(`${this.baseRoute}${this.usersPath}`, entity, {
      headers,
    });
  }
  override edit(entity: Partial<User>): Observable<User> {
    const token = this.oAuthService.getAccessToken();
    console.log('token', token);
    const headers = super.createHeaders(token);
    return this.http.put<User>(`${this.baseRoute}${this.usersPath}`, entity, {
      headers,
    });
  }
  override delete(entity: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
}
