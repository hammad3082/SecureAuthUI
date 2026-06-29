import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

export type ServerStatus = 'checking' | 'delayed' | 'healthy' | 'unhealthy';

@Injectable({
  providedIn: 'root',
})
export class AppWarmUp {

  private http = inject(HttpClient);
  private appurl = `${environment.apiUrl}/Health/warmup`;

  status = signal<ServerStatus>('checking');
  private hasRun = false;

  initiateWarmUp(): void {
    
    if (this.hasRun) {
      return;
    }

    this.hasRun = true;
    
    console.log('🚀 Waking up backend and Database...');

    const delayTimer = setTimeout(() => {
      if (this.status() === 'checking') {
        this.status.set('delayed');
      }
    }, 3000);

    this.http.get<{ status: string, warmed: Boolean}>(this.appurl).subscribe({
      next: (response) => {
        if(response.warmed){
          this.status.set('healthy');
          console.log('🟢 Backend & DB are fully active.');
        }
      },
      error: (err) => {
        console.error('⚠️ Warmup check failed:', err);
        this.status.set('unhealthy');
      }
    })
  }
}

