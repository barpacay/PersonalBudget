import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error))
      );
  }

  signup(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error))
      );
  }

  getToken(): string | null {
    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const currentTime = Date.now() / 1000;
      const timeUntilExpiration = this.jwtHelper.decodeToken(token).exp - currentTime;

      const warningThreshold = 20;

      if (timeUntilExpiration < warningThreshold) {
        console.warn('Your session will expire soon. Please refresh or log in again.');
      }

      return token;
    }

    return null;
  }
}



