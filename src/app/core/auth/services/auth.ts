import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../../features/auth/models/login.model';
import { Storage } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private storage = inject(Storage);

  private apiUrl = "https://localhost:7254/api/Auth";
  private readonly AUTH_KEY = 'auth_token';

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {// 'tap' catches the successful HTTP 200 payload automatically
          if(response && response.accessToken){
            this.storage.setItem(this.AUTH_KEY, response.accessToken);
          }
        })
      );
  }
}
