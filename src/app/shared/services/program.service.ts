import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program, ProgramToService } from '../models/Programs';
import { BaseService } from './base.service';
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
  override add(entity: Program): Observable<Program> {
    alert('Creating PROGRAM' + entity.name);
    throw new Error('Method not implemented.');
  }

  override edit(entity: Program): Observable<Program> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);        
    return this.http.put<Program>(
      `${this.baseRoute}${this.programsPath}`,      
      entity,
      { headers }      
    );
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
