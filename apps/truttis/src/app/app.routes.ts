import { Route } from '@angular/router';
import { authGuard, LoginComponent } from '@truttis/feature-auth';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadComponent: () => import('@truttis/feature-dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'meetings',
    loadComponent: () => import('@truttis/feature-meetings').then(m => m.MeetingsListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    loadComponent: () => import('@truttis/feature-settings').then(m => m.SettingsComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('@truttis/feature-users').then(m => m.UsersComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];
