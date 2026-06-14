import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '../services/storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);

  const AUTH_KEY = 'auth_token';

  const token = storage.getItem(AUTH_KEY);

  if(token)
  {
    req = req.clone({
      setHeaders : {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req);
};
