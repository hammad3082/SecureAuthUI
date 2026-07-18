import { Routes } from "@angular/router";
import { DashboardLayout } from "./components/dashboard-layout/dashboard-layout";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayout,
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                loadComponent: () => import('./pages/overview/overview.page').then(m => m.OverviewPage)
            },
            {
                path: 'audit-logs',
                loadComponent: () => import('./pages/audit-logs/audit-logs.page').then(m => m.AuditLogsPage)
            }
        ]
    }
]