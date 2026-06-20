import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { form, required, email, minLength, validate, FormField, FormRoot } from '@angular/forms/signals';
import { RegisterRequest } from '../../models/register.model';
import { Auth } from '../../../../core/auth/services/auth';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormField, FormRoot, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage {
  private http = inject(HttpClient);
  private router = inject(Router);
  private auth = inject(Auth);

  registerModel = signal({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  registerForm = form(
    this.registerModel, 
    (path) => {
      required(path.name, {message: 'Name is Required'});
      required(path.email, {message: 'Email is Required'});
      required(path.password, {message: 'Password is Required'});
      required(path.confirmPassword, {message: 'Please confirm your password'});

      email(path.email, {message: 'Please enter a valid email address'});
      minLength(path.password, 6, {message: 'Password must be at least 6 characters'});

      validate(path.confirmPassword, (ctx) => {
        const mainPassword = ctx.valueOf(path.password);
        const confirmPassword = ctx.value();

        return mainPassword === confirmPassword 
          ? null 
          : { kind: 'mismatch', message: 'Passwords do not match' };
      });
    },
    {
      submission: {
        action: async () => {
          const payload: RegisterRequest = {
            username: this.registerModel().name,
            email: this.registerModel().email,
            password: this.registerModel().password
          }
          try {
            await firstValueFrom(this.auth.register(payload));
            console.log('Registered successfully')
            this.router.navigate(['/auth/login']);
            return;
          } catch (err) {
            console.error('API Error:', err);
            return { kind: 'serverError', message: 'Registration failed at backend API boundary' };
          }
        }
      }
    }
);
}
