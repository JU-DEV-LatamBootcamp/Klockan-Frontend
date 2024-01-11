import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThirdPartyAuthService {
  constructor(private http: HttpClient) {}

  facebookAuth() {
    this.http.get('https://localhost:5001/api/auth/facebook').subscribe(res => {
      console.log(res);
    });
  }
  googleAuth() {
    this.http.get('https://localhost:5001/api/auth/google').subscribe(res => {
      console.log(res);
    });
  }
  twitterAuth() {
    this.http.get('https://localhost:5001/api/auth/twitter').subscribe(res => {
      console.log(res);
    });
  }
}
