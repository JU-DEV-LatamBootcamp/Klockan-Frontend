import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

 url = 'http://localhost:5209/WeatherForecast';

  
  constructor(private http : HttpClient) { }

  getBackendData(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get(this.url, { headers }).pipe(
      catchError((error) => {
        if(error.status === 401) {
          return throwError(()=> new Error('No autorizado', error));
        }
        return throwError(()=> new Error(error));
      })
    );
  }
  
  private handleApiError(error: any) {
    console.error('Error en la llamada a la API:', error);
    if (error.status === 401) {
      console.error('Error de autenticación no autorizada');
    } else if (error.status === 404) {
      console.error('Recurso no encontrado');
    } else {
      console.error('Error desconocido');
    }
  }
}
