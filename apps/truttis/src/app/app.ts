import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectIsLoggedIn, selectIsAdmin, logout } from '@truttis/feature-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  template: `
    <div class="app-shell">
      @if (isLoggedIn$ | async) {
        <nav class="navbar">
          <span class="nav-brand">🎣 Truttis</span>
          <div class="nav-links">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/meetings" routerLinkActive="active">Meetings</a>
            @if (isAdmin$ | async) {
              <a routerLink="/users" routerLinkActive="active">Users</a>
            }
            <a routerLink="/settings" routerLinkActive="active">Settings</a>
            <button class="btn-signout" (click)="onLogout()">Sign Out</button>
          </div>
        </nav>
      }
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-shell { display:flex; flex-direction:column; min-height:100vh; }
    .navbar { background:#1a1a2e; color:white; padding:0 1.5rem; display:flex; align-items:center; justify-content:space-between; height:60px; }
    .nav-brand { font-size:1.2rem; font-weight:700; }
    .nav-links { display:flex; align-items:center; gap:1.5rem; }
    .nav-links a { color:#ccc; text-decoration:none; font-size:.95rem; }
    .nav-links a.active { color:white; font-weight:600; }
    .btn-signout { background:transparent; color:#ccc; border:1px solid #555; padding:.25rem .75rem; border-radius:4px; cursor:pointer; font-size:.9rem; }
    .btn-signout:hover { color:white; border-color:#aaa; }
    .content { flex:1; background:#f5f5f5; }
  `],
})
export class App {
  private store = inject(Store);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  isAdmin$ = this.store.select(selectIsAdmin);

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
