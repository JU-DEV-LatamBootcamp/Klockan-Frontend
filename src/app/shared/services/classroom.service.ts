import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Classroom, ClassroomFromService } from '../models/Classroom';
import {
  transformClassroomFromService,
  transformToCreateClassroom,
  transformToUpdateClassroom,
} from '../utils/classroom-mapper';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../models/Schedule';
import { ClassroomUser } from '../models/ClassroomUser';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService extends BaseService<Classroom> {
  classroomPath = environment.api.classroomsEndpoint;

  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<Classroom[]> {
    return this.http
      .get<ClassroomFromService[]>(`${this.baseRoute}${this.classroomPath}`)
      .pipe(
        map(coursesFromService =>
          transformClassroomFromService(coursesFromService)
        )
      );
  }

  override create(classroom: Classroom): Observable<Classroom> {
    const body = transformToCreateClassroom(classroom);

    return this.http.post<Classroom>(this.baseRoute + this.classroomPath, body);
  }

  override edit(classroom: Classroom): Observable<Classroom> {
    const body = transformToUpdateClassroom(classroom);
    return this.http.put<Classroom>(
      `${this.baseRoute}${this.classroomPath}/${classroom.id}`,
      body
    );
  }

  override delete(entity: Classroom): Observable<Classroom> {
    return this.http.delete<Classroom>(
      `${this.baseRoute}${this.classroomPath}/${entity.id}`
    );
  }

  removeUserFromClassroom(
    classroomId: number,
    userId: number
  ): Observable<User> {
    return this.http.delete<User>(
      `${this.baseRoute}${this.classroomPath}/${classroomId}/${userId}`
    );
  }

  get(id: number): Observable<ClassroomFromService> {
    return this.http.get<ClassroomFromService>(
      `${this.baseRoute}${this.classroomPath}/${id}`
    );
  }

  getUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseRoute}${this.classroomPath}/${id}/attendees`
    );
  }

  getSchedules(classroomId: number) {
    const schedulesPath =
      this.baseRoute + environment.api.schedulesEndpoint(classroomId);

    return this.http.get<Schedule[]>(schedulesPath);
  }

  updateUsers(
    classroomId: number,
    users: ClassroomUser[]
  ): Observable<ClassroomUser[]> {
    const usersPath =
      this.baseRoute + environment.api.classroomUsersEndpoint(classroomId);
    const body = { users };

    return this.http.put<ClassroomUser[]>(usersPath, body);
  }
}
