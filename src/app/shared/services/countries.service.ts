import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService extends BaseService<Country> {
  countriesPath = environment.api.countriesEndpoint;

  override getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseRoute + this.countriesPath);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override create(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override edit(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override delete(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
}
