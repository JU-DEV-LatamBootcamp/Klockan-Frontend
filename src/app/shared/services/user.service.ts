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
    return this.http.get<User[]>(
      'https://run.mocky.io/v3/8e98b9bd-f4a8-4a12-870e-ac2744483b46',
      // this.baseRoute + this.usersPath
      {
        headers,
      }
    );
  }

  override create(entity: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
  override edit(entity: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
  override delete(entity: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
}
