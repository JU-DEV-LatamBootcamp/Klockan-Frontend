import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../models/Courses';
import { BaseService } from './base.service';
import { environment } from 'src/environments/keycloak.enviroment';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  coursePath = environment.api.coursesEndpoint;

  override getAll(): Observable<Course[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<Course[]>(this.baseRoute + this.coursePath, {
      headers,
    });
  }

  override edit(entity: Course): Observable<Course> {
    alert('Editing COURSE' + entity.name);
    throw new Error('Method not implemented.');
  }
  override delete(entity: Course): Observable<Course> {
    alert('Deleting COURSE' + entity.id);
    throw new Error('Method not implemented.');
  }
}
