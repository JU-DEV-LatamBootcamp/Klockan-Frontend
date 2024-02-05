import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Program } from '../models/Programs';
import { BaseService } from './base.service';
import { transformProgramForService } from '../utils/program-mapper';
import { environment } from 'src/environments/keycloak.enviroment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseService<Program> {
  programsPath = environment.api.programsEndpoint;

  override getAll(): Observable<Program[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<Program[]>(this.baseRoute + this.programsPath, {
      headers,
    });
  }

  override create(program: Program): Observable<Program> {
    const token = this.oAuthService.getAccessToken();
    const body = transformProgramForService(program);
    const headers = super.createHeaders(token);
    return this.http.post<Program>(
      this.baseRoute + this.apiProgramsPath,
      body,
      { headers }
    );
  }

  override edit(entity: Program): Observable<Program> {
    alert('Editing PROGRAM' + entity.name);
    throw new Error('Method not implemented.');
  }
  override delete(entity: Program): Observable<Program> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);

    return this.http.delete<Program>(
      `${this.baseRoute}${this.programsPath}/${entity.id}`,
      { headers }
    );
  }
}
