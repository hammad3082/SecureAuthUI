import { inject, Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { Storage } from '../auth/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LiveCounter {
  public onlineCount = signal<number>(0);
  private hubConnection!: signalR.HubConnection;

  private storage = inject(Storage);

  constructor() {
    this.initSignalR();
  }

  private initSignalR(): void {
    const browserId = this.getOrCreateBrowserId();

    const hubUrl = `${environment.apiUrl}/hubs/online-users?browserId=${browserId}`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('UpdateOnlineCount', (count: number) => {
      this.onlineCount.set(count);
      console.log('Live Counter Updated to: ', this.onlineCount(),'from hub', count)
    });

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected for anonymous tracking.'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  }

  private getOrCreateBrowserId(): string {
    let id = this.storage.getItem('demo_browser_id');
    if (!id) {
      id = crypto.randomUUID(); 
      this.storage.setItem('demo_browser_id', id);
    }
    return id;
  }
}
