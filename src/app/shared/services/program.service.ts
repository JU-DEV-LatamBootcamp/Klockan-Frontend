import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../models/Programs';
import { BaseService } from './base.service';
import { environment } from 'src/environments/keycloak.enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseService<Program> {
  apiProgramsPath = environment.api.programsEndpoint;

  override getAll(): Observable<Program[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<Program[]>(this.baseRoute + this.apiProgramsPath, {
      headers,
    });
  }

  override edit(entity: Program): Observable<Program> {
    alert('Editing PROGRAM' + entity.name);
    throw new Error('Method not implemented.');
  }
  override delete(entity: Program): Observable<Program> {
    alert('Deleting PROGRAM' + entity.id);
    throw new Error('Method not implemented.');
  }
}
