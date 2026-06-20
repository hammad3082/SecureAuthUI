import { Component, inject, signal } from '@angular/core';
import { Sample } from '../../services/sample';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.css',
})
export class OverviewPage {
  private SampleService = inject(Sample);

  apiMessage = signal<string>('Loading secure message...');
  errorMessage = signal<string | null>(null);

  RemoveTokens(): void{
    this.SampleService.RemoveTokens();
  }

  ngOnInit() : void{
    this.SampleService.getProtectedData().subscribe({
      next: (message) => {
        this.apiMessage.set(message);
        console.log(message);
      },
      error: (err) => {
        console.error('Interceptor failed:', err);
        this.errorMessage.set('Failed to load secure data. Check network headers!');
        this.apiMessage.set('');
      }
    });
  }
}
