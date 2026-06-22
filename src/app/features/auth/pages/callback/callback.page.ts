import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../../../core/auth/services/auth';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.page.html',
  styleUrl: './callback.page.css',
})
export class CallbackPage implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(Auth);
  
  private readonly AUTH_KEY = 'auth_token';
  private readonly REFRESH_KEY = 'refresh_token';

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParamMap.get('accessToken');
    const refreshToken = this.route.snapshot.queryParamMap.get('refreshToken');

    console.log('Got Tokens from API\'s Callback Response');
    if (accessToken) {
      localStorage.setItem(this.AUTH_KEY, accessToken);
      if (refreshToken) {
        localStorage.setItem(this.REFRESH_KEY, refreshToken);
      }

      //this.authService.isAuthenticated.set(true);
      
      this.router.navigate(['/dashboard']);
    } else {
      console.error('SSO authentication handshake failed: Missing access token.');
      this.router.navigate(['/auth/login']);
    }
  }
}
