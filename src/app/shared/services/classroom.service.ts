import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/keycloak.enviroment';
import { map } from 'rxjs/operators';
import { Classroom, ClassroomFromService } from '../models/Classroom';
import { transformClassroomFromService } from '../utils/classroom-mapper';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService extends BaseService<Classroom> {
  classroomPath = environment.api.classroomsEndpoint;

  override getAll(): Observable<Classroom[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);

    return this.http
      .get<ClassroomFromService[]>(`${this.baseRoute}${this.classroomPath}`, {
        headers,
      })
      .pipe(
        map(coursesFromService =>
          transformClassroomFromService(coursesFromService)
        )
      );
  }
  override edit(): Observable<Classroom> {
    throw new Error('Method not implemented.');
  }
  override delete(): Observable<Classroom> {
    throw new Error('Method not implemented.');
  }
  override create(): Observable<Classroom> {
    throw new Error('Method not implemented.');
  }
}
