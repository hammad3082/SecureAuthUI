import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '../../../core/auth/services/storage.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Sample {
  private http = inject(HttpClient);
  private storage = inject(Storage)

  private readonly AUTH_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';

  private apiUrl = `${environment.apiUrl}/Sample`;

  getProtectedData(): Observable<string> {
    return this.http.get(`${this.apiUrl}/protected`, {responseType: 'text'});
  }

  RemoveTokens(): void{
    this.storage.removeItem(this.AUTH_KEY);
    this.storage.removeItem(this.REFRESH_KEY);
  }
}
