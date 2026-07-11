import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Storage } from '../../../core/auth/services/storage.service';
import { SessionDiagnostics } from '../models/overview.model';
@Injectable({
  providedIn: 'root',
})
export class Overview {
  private http = inject(HttpClient);
  private storage = inject(Storage)

  private readonly AUTH_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';

  private apiUrl = `${environment.apiUrl}`;

  getProtectedDiagnostics(): Observable<SessionDiagnostics> {
    return this.http.get<SessionDiagnostics>(`${this.apiUrl}/Security/diagnostics`)
  }

  getProtectedData(): Observable<string> {
    return this.http.get(`${this.apiUrl}/Sample/protected`, {responseType: 'text'});
  }

  RemoveTokens(): void{
    this.storage.removeItem(this.AUTH_KEY);
    this.storage.removeItem(this.REFRESH_KEY);
  }
}
