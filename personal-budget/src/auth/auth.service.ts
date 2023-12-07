import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api'; // Adjust the API URL based on your backend setup

  constructor(private http: HttpClient) {}

  login(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  signup(data: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt');

    if (token) {
      const decodedToken: any = jwt_decode(token);

      const currentTime = Date.now() / 1000;
      const timeUntilExpiration = decodedToken.exp - currentTime;

      const warningThreshold = 20;

      if (timeUntilExpiration < warningThreshold) {
        console.warn('Your session will expire soon. Please refresh or log in again.');
      }
    }

    return token;
  }
}



