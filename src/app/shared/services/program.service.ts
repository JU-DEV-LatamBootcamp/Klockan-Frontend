import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../models/Programs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseService<Program>{
  
  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.baseRoute + 'programs');
  }

  override edit(entity: Program): Observable<Program> {
    alert ('Editing PROGRAM' + entity.name);
    throw new Error('Method not implemented.');
  }
  override delete(entity : Program): Observable<Program> {
    alert ('Deleting PROGRAM' + entity.id);
    throw new Error('Method not implemented.');
  }
}
