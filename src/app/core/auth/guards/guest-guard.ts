import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '../services/storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const storage = inject(Storage)
  const router = inject(Router)

  const AUTH_KEY = 'auth_token';

  const token = storage.getItem(AUTH_KEY);

  if(token)
  {
    console.log('Guest Guard Blocking.. Routing away from /auth')

    router.navigate(['/dashboard']);
    return false;
  }
  
  return true;
};
