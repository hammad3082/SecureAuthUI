import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../core/auth/services/auth';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private authService = inject(Auth);

  pageTitle = 'Secure Login Portal';

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

    const loginPayload = this.loginForm.getRawValue();
    console.log('Valid Form Payload:', loginPayload);

    this.authService.login(loginPayload).subscribe(
      {
        next: (response) => {
          console.log('Login successful! JWT Token received:', response.accessToken);

          // TODO: Save token to localStorage and navigate to dashboard
        },
        error: (apiError) => {
          console.log('Authentication failed:', apiError);
        
          // TODO: Display an error message banner on the UI
        }
      }
    )
  }
}
