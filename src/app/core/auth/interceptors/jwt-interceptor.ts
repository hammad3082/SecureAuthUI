import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '../services/storage.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);
  const auth = inject(Auth);
  const router = inject(Router)

  const AUTH_KEY = 'auth_token';
  const REFRESH_KEY = 'refresh_token';

  const token = storage.getItem(AUTH_KEY);

  let authReq = req;
  if(token)
  {
    authReq = authReq.clone({
      setHeaders : {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || error.url?.includes('/api/Auth/login')) {
        return (throwError(() => error));
      }

      console.warn('Access token expired. Attempting background token refresh...');

      return auth.refreshToken().pipe(
        switchMap((response) => {
          console.log('Token refreshed successfully! Retrying original request...');

          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${response.accessToken}` }
          });

          return next(retryReq);
        }),
        catchError((refreshError) => {
          console.error('Refresh token invalid. Evicting user to login screen.');

          storage.removeItem(AUTH_KEY);
          storage.removeItem(REFRESH_KEY);

          router.navigate(['/auth/login']);

          return throwError(() => refreshError);
        })
      )
    })
  );
};
