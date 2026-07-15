export interface AuditLogResponse {
    id: number;
    eventType: string;
    requestMethod: string;
    requestPath: string;
    statusCode: number;
    ipAddress: string;
    userAgent: string;
    priority: number;
    timestamp: string;
    userId: number | null;
}

export interface PaginatedEnvelope {
  items: AuditLogResponse[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
}