import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from './base.service';
import {
  transformCourseFromService,
  transformCourseService,
  transformCourseToService,
} from '../utils/course-mapper';
import { Course, CourseFromService } from '../models/Courses';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  coursesPath = environment.api.coursesEndpoint;

  override getAll(): Observable<Course[]> {
    return this.http
      .get<CourseFromService[]>(`${this.baseRoute}${this.coursesPath}`)
      .pipe(
        map(coursesFromService =>
          transformCourseFromService(coursesFromService)
        )
      );
  }

  override create(entity: Course): Observable<Course> {
    const courseToService = transformCourseToService(entity);

    return this.http.post<Course>(
      `${this.baseRoute}${this.coursesPath}`,
      courseToService
    );
  }

  override edit(entity: Course): Observable<Course> {
    const courseToService = transformCourseService(entity);

    return this.http.put<Course>(
      `${this.baseRoute}${this.coursesPath}/${courseToService.id}`,
      courseToService
    );
  }

  override delete(entity: Course): Observable<Course> {
    return this.http.delete<Course>(
      `${this.baseRoute}${this.coursesPath}/${entity.id}`
    );
  }
}
