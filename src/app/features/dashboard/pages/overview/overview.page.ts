import { Component, inject, signal } from '@angular/core';
import { SessionDiagnostics } from '../../models/overview.model';
import { Overview } from '../../services/overview';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.css',
})
export class OverviewPage {
  private OverviewService = inject(Overview);

  diagnostics = signal<SessionDiagnostics | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit() : void {
    this.fetchDashboardData();
  }

  fetchDashboardData() : void {
    this.OverviewService.getProtectedDiagnostics().subscribe({
      next: (data) => {
        this.diagnostics.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load identity diagnostics:', err);

        this.errorMessage.set('Failed to verify security context.');
        this.isLoading.set(false);
      }
    });
  }
  
  // RemoveTokens(): void{
  //   this.SampleService.RemoveTokens();
  // }
}
