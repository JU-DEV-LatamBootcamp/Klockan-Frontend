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
    return this.http.get<User[]>(this.baseRoute + this.usersPath);
  }

  override create(entity: User): Observable<User> {
    return this.http.post<User>(`${this.baseRoute}${this.usersPath}`, entity);
  }
  override edit(entity: Partial<User>): Observable<User> {
    alert(`editando usuario ${JSON.stringify(entity)}`);
    console.log('editando usuario', entity);
    return this.http.put<User>(`${this.baseRoute}${this.usersPath}`, entity);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override delete(entity: User): Observable<User> {
    throw new Error('Method not implemented.');
  }
}
