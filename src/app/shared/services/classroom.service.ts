import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Classroom, ClassroomFromService } from '../models/Classroom';
import {
  transformClassroomFromService,
  transformToCreateClassroom,
  transformToUpdateClassroom,
} from '../utils/classroom-mapper';
import { Schedule } from '../models/Schedule';

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

  override create(classroom: Classroom): Observable<Classroom> {
    const token = this.oAuthService.getAccessToken();
    const body = transformToCreateClassroom(classroom);
    const headers = super.createHeaders(token);

    return this.http.post<Classroom>(
      this.baseRoute + this.classroomPath,
      body,
      {
        headers,
      }
    );
  }

  override edit(classroom: Classroom): Observable<Classroom> {
    const token = this.oAuthService.getAccessToken();
    const body = transformToUpdateClassroom(classroom);
    const headers = super.createHeaders(token);

    return this.http.put<Classroom>(
      `${this.baseRoute}${this.classroomPath}/${classroom.id}`,
      body,
      { headers }
    );
  }

  override delete(entity: Classroom): Observable<Classroom> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);

    return this.http.delete<Classroom>(
      `${this.baseRoute}${this.classroomPath}/${entity.id}`,
      { headers }
    );
  }

  getSchedules(classroomId: number) {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    const schedulesPath =
      this.baseRoute + environment.api.schedulesEndpoint(classroomId);

    return this.http.get<Schedule[]>(schedulesPath, { headers });
  }
}
