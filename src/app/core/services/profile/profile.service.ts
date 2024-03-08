import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  usersPath = environment.api.usersEndpoint;
  baseUrl = environment.apiBasePath;
  constructor(private http: HttpClient) {}

  getUserByEmail(email?: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${this.usersPath}/${email}`);
  }
}
