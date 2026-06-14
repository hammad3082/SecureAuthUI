import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/overview/overview.page').then(c => c.OverviewPage)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
