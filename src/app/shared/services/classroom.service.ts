import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Classroom, ClassroomFromService } from '../models/Classroom';
import {
  transformClassroomFromService,
  transformClassroomFromServiceArray,
  transformToCreateClassroom,
  transformToUpdateClassroom,
} from '../utils/classroom-mapper';
import { Schedule } from '../models/Schedule';
import { ClassroomUser } from '../models/ClassroomUser';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService extends BaseService<Classroom> {
  classroomPath = environment.api.classroomsEndpoint;

  getById(id: number, populate: boolean): Observable<Classroom> {
    return this.http
      .get<ClassroomFromService>(
        `${this.baseRoute}${this.classroomPath}/${id}`,
        { params: { populate } }
      )
      .pipe(map(classroom => transformClassroomFromService(classroom)));
  }

  override getAll(): Observable<Classroom[]> {
    return this.http
      .get<ClassroomFromService[]>(`${this.baseRoute}${this.classroomPath}`)
      .pipe(
        map(coursesFromService =>
          transformClassroomFromServiceArray(coursesFromService)
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

  getSchedules(classroomId: number) {
    const schedulesPath =
      this.baseRoute + environment.api.schedulesEndpoint(classroomId);

    return this.http.get<Schedule[]>(schedulesPath);
  }

  getUsers(classroomId: number): Observable<ClassroomUser[]> {
    const usersPath =
      this.baseRoute + environment.api.classroomUsersEndpoint(classroomId);

    return this.http.get<ClassroomUser[]>(usersPath);
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
