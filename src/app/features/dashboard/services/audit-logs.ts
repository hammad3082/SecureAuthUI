import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedEnvelope } from '../models/audit-logs.models';

@Injectable({
  providedIn: 'root',
})
export class AuditLogs {
  private http = inject(HttpClient);

  private appUrl = environment.apiUrl;

  getLogs(page: number = 1, pageSize: number = 10): Observable<PaginatedEnvelope> {
    const params = new HttpParams()
    .set('Page', page)
    .set('PageSize', pageSize);
    
    return this.http.get<PaginatedEnvelope>(`${this.appUrl}/AuditLogs`, {params});
  }
}