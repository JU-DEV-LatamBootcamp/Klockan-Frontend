import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  register(data : RegisterModel){
    return this.http.post('http://localhost:3000/api/register', data);
  }

  login(data : LoginModel){
    return this.http.post('http://localhost:3000/api/login', data);
  }
}
