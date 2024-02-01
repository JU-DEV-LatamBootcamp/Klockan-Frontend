import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import { transformCourseFromService } from '../utils/course-mapper';
import { Course, CourseFromService } from '../models/Courses';
import { Endpoints } from '../constants/EndpointsEnum';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  override getAll(): Observable<Course[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http
      .get<CourseFromService[]>(
        `${this.baseRoute}${Endpoints.GET_ALL_COURSES}`,
        {
          headers,
        }
      )
      .pipe(
        map(coursesFromService =>
          transformCourseFromService(coursesFromService)
        )
      );
  }

  override edit(entity: Course): Observable<Course> {
    alert('Editing COURSE' + entity.name);
    throw new Error('Method not implemented.');
  }

  override delete(entity: Course): Observable<any> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    console.log('first');
    // alert('Deleting COURSE' + entity.id);
    return this.http.delete(
      `${this.baseRoute}${Endpoints.DELETE_COURSE}/${entity.id}`,
      { headers }
    );
  }
}
