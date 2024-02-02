import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import {
  transformCourseFromService,
  transformCourseToService,
} from '../utils/course-mapper';
import { Course, CourseFromService } from '../models/Courses';
import { environment } from 'src/environments/keycloak.enviroment';
@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  coursesPath = environment.api.coursesEndpoint;

  override getAll(): Observable<Course[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http
      .get<CourseFromService[]>(`${this.baseRoute}${this.coursesPath}`, {
        headers,
      })
      .pipe(
        map(coursesFromService =>
          transformCourseFromService(coursesFromService)
        )
      );
  }

  override add(entity: Course): Observable<Course> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    const courseToService = transformCourseToService(entity);

    return this.http.post<Course>(
      `${this.baseRoute}${this.coursesPath}`,
      courseToService,
      {
        headers,
      }
    );
  }

  override edit(entity: Course): Observable<Course> {
    alert('Editing COURSE' + entity.name);
    throw new Error('Method not implemented.');
  }

  override delete(entity: Course): Observable<Course> {
    alert('Deleting COURSE' + entity.id);

    // throw new Error('Method not implemented.');

    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.delete<Course>(
      `${this.baseRoute}${this.coursesPath}/${entity.id}`,
      { headers }
    );
  }
}
