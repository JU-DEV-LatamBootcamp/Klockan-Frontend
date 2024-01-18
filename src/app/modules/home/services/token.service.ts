import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getPreferredUsername(jwt: string): string | null {
    if (!jwt) {
      return null;
    }

    try {
      // Divide el token en sus partes
      const tokenParts = jwt.split('.');

      // Decodifica la parte del payload (segunda parte)
      const decodedPayload = atob(tokenParts[1]);

      // Convierte el payload decodificado a un objeto JSON
      const payloadObj = JSON.parse(decodedPayload);

      // Extrae el campo "preferred_username" del objeto payload
      const preferredUsername = payloadObj.preferred_username;

      return preferredUsername || null;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}
