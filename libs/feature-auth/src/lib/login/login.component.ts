import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../state/auth.actions';
import { selectError, selectIsLoading } from '../state/auth.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, AsyncPipe],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>🎣 Truttis</h1>
        <h2>Sign In</h2>
        <p class="hint">
          No connection yet?
          <a routerLink="/settings">Configure settings first</a>
        </p>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" formControlName="email" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" placeholder="••••••••" />
          </div>
          @if (error$ | async; as error) {
            <div class="error-msg">{{ error }}</div>
          }
          <button type="submit" [disabled]="form.invalid || (isLoading$ | async)">
            {{ (isLoading$ | async) ? 'Signing in…' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f5f5f5; }
    .login-card { background:white; padding:2rem; border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,.1); width:100%; max-width:400px; }
    h1 { text-align:center; margin-bottom:.25rem; }
    h2 { text-align:center; color:#666; margin-bottom:.5rem; font-size:1.1rem; font-weight:400; }
    .hint { text-align:center; font-size:.85rem; color:#888; margin-bottom:1.25rem; }
    .form-group { margin-bottom:1rem; }
    label { display:block; margin-bottom:.25rem; font-weight:500; }
    input { width:100%; padding:.75rem; border:1px solid #ddd; border-radius:4px; font-size:1rem; box-sizing:border-box; }
    button { width:100%; padding:.75rem; background:#007bff; color:white; border:none; border-radius:4px; font-size:1rem; cursor:pointer; margin-top:.5rem; }
    button:disabled { opacity:.6; cursor:not-allowed; }
    .error-msg { color:#dc3545; margin-bottom:.5rem; font-size:.9rem; }
  `],
})
export class LoginComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error$ = this.store.select(selectError);
  isLoading$ = this.store.select(selectIsLoading);

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.store.dispatch(login({ email: email!, password: password! }));
    }
  }
}
