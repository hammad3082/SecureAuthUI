export interface SessionDiagnostics {
  userName: string;
  userRole: string;
  ipAddress: string;
  userAgent: string;
  loginMethod: string;
  isTwoFactorEnabled: boolean;
}