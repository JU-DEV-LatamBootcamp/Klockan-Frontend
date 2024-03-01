import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../models/Programs';
import { BaseService } from './base.service';
import { transformProgramForService } from '../utils/program-mapper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseService<Program> {
  programsPath = environment.api.programsEndpoint;

  override getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.baseRoute + this.programsPath);
  }

  override create(program: Program): Observable<Program> {
    const body = transformProgramForService(program);

    return this.http.post<Program>(this.baseRoute + this.programsPath, body);
  }

  override edit(entity: Program): Observable<Program> {
    return this.http.put<Program>(
      `${this.baseRoute}${this.programsPath}`,
      entity
    );
  }

  override delete(entity: Program): Observable<Program> {
    return this.http.delete<Program>(
      `${this.baseRoute}${this.programsPath}/${entity.id}`
    );
  }
}
