import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isLoading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;

        const user = response?.response_Body?.[0];
        const isValidLogin = response?.status_Code === 200 && !!user?.user_Code;

        if (isValidLogin) {
          this.router.navigate(['/purchase-bill']);
          return;
        }

        this.errorMessage = response?.message || 'Invalid email or password.';
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;

        const backendMessage =
          typeof error?.error === 'string'
            ? error.error
            : error?.error?.message;

        console.error('Login error:', error);
        this.errorMessage = backendMessage || 'Invalid email or password.';
        this.cdr.detectChanges();
      }
    });
  }
}