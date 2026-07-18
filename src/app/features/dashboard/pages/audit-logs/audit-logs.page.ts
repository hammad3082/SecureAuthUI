import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PaginatedEnvelope } from '../../models/audit-logs.models';
import { AuditLogs } from '../../services/audit-logs';

@Component({
  selector: 'app-audit-logs',
  imports: [DatePipe],
  templateUrl: './audit-logs.page.html',
  styleUrl: './audit-logs.page.css',
})
export class AuditLogsPage {
  private auditLogService = inject(AuditLogs);

  paginationData = signal<PaginatedEnvelope | null>(null);
  currentPage = signal<number>(1);
  currentPageSize = signal<number>(10);

  //logs = signal<AuditLogResponse[]>([]);
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadPage(this.currentPage(), this.currentPageSize());
  }

  loadPage(page: number, pageSize: number = 10) {
    this.auditLogService.getLogs(page, pageSize).subscribe({
      next: (data) => {
        this.paginationData.set(data);
        this.currentPage.set(data.pageNumber);
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Error fetching logs', err);
        this.errorMessage.set('Error Getting Audit Logs');
        this.isLoading.set(false)
      }
    })
  }
}
