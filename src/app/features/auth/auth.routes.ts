import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes =[
    {
        path: "login",
        loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
    },
    {
        path: 'callback',
        loadComponent: () => import('./pages/callback/callback.page').then(m => m.CallbackPage)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]