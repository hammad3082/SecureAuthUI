import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../../core/auth/services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private authService = inject(Auth);
  private router = inject(Router);

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
          console.log('Token is safely cached in Local Storage!');
          
          this.router.navigate(['/dashboard'])
        },
        error: (apiError) => {
          console.error('Authentication failed:', apiError);
        
          // TODO: Display an error message banner on the UI
        }
      }
    )
  }
}
