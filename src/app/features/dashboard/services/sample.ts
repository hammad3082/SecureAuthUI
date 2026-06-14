import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sample {
  private http = inject(HttpClient);

  private apiUrl = "https://localhost:7254/api/Sample";

  getProtectedData(): Observable<string> {
    return this.http.get(`${this.apiUrl}/protected`, {responseType: 'text'});
  }
}
