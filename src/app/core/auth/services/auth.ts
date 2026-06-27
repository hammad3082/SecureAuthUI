import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../../features/auth/models/login.model';
import { Storage } from './storage.service';
import { RegisterRequest } from '../../../features/auth/models/register.model';
import { ExternalLoginResponse } from '../../../features/auth/models/ExternalAuth.model';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private storage = inject(Storage);

  private apiUrl = `${environment.apiUrl}/Auth`;

  private readonly AUTH_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {// 'tap' catches the successful HTTP 200 payload automatically
          if(response && response.accessToken){
            this.storage.setItem(this.AUTH_KEY, response.accessToken);
            this.storage.setItem(this.REFRESH_KEY, response.refreshToken);

            console.info('Logined in Successfully')
          }
        })
      );
  }

  refreshToken(): Observable<any> {
    const RefreshToken = this.storage.getItem(this.REFRESH_KEY);
    
    if (!RefreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    console.log('Calling Refresh Token API');

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { RefreshToken }).pipe(
      tap(response => {
        this.storage.setItem(this.AUTH_KEY, response.accessToken);
      })
    );
  }

  register(details: RegisterRequest): Observable<any> {
    console.log('register payload: ', details)
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, details);
  }

  getExternalLoginUrl(provider: string): Observable<ExternalLoginResponse> {
    return this.http.get<ExternalLoginResponse>(
      `${this.apiUrl}/external/login?provider=${provider}`
    );
  }
}
