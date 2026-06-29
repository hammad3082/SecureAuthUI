import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../core/auth/services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppWarmUp } from '../../../../core/services/app-warm-up';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private authService = inject(Auth);
  private router = inject(Router);

  protected warmUpService = inject(AppWarmUp)

  ngOnInit(): void {
    this.warmUpService.initiateWarmUp();
  }
  
  pageTitle = 'Secure Login Portal';

  isLoading = signal<boolean>(false);
  isGoogleLoading = signal<boolean>(false);

  errorMessage = signal<string| null>(null);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  get username() { return this.loginForm.get('username') as FormControl; }
  
  get password() { return this.loginForm.get('password') as FormControl; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    const loginPayload = this.loginForm.getRawValue();
    console.log('Valid Form Payload:', loginPayload);

    this.authService.login(loginPayload).subscribe(
      {
        next: (response) => {
          console.log('Token is safely cached in Local Storage!');
          
          this.isLoading.set(false);
          this.router.navigate(['/dashboard'])
        },
        error: (apiError) => {
          console.error('Authentication failed:', apiError);
          
          this.isLoading.set(false);
          if(apiError.status === 401) {
            this.errorMessage.set('Invalid name or password. Please try again.')
          }
          else {
            this.errorMessage.set('An unexpected system error occurred. Please try again later.')
          }
        }
      }
    )
  }

  async loginWithGoogle(): Promise<void> {
    try {
      this.errorMessage.set(null);

      this.isGoogleLoading.set(true);

      const response = await firstValueFrom(this.authService.getExternalLoginUrl('Google'));
      console.log('external auth response', response);
      window.location.href = response.loginUrl;
      //window.open(response.loginUrl, '_blank');

    } catch (err) {
      this.isGoogleLoading.set(false);
      console.error('Failed to retrieve external provider login URL:', err);

      this.errorMessage.set('An unexpected system error occurred. Please try again later.')
    }
  }
}
