import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Classroom } from '../models/Classroom';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/keycloak.enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService extends BaseService<Classroom> {
  classroomPath = environment.api.classroomsEndpoint;

  override getAll(): Observable<Classroom[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<Classroom[]>(
      `${this.baseRoute}${this.classroomPath}`,
      { headers }
    );
  }
  override edit(): Observable<Classroom> {
    throw new Error('Method not implemented.');
  }
  override delete(): Observable<Classroom> {
    throw new Error('Method not implemented.');
  }
}
