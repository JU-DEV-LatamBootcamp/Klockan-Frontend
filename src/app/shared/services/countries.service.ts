import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService extends BaseService<Country> {
  countriesPath = environment.api.usersEndpoint;

  override getAll(): Observable<Country[]> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.get<Country[]>(this.baseRoute + this.countriesPath, {
      headers,
    });
  }

  override create(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
  override edit(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
  override delete(entity: Country): Observable<Country> {
    throw new Error('Method not implemented.');
  }
}
