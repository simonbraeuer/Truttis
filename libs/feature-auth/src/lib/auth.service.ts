import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '@truttis/core-api';
import { AuthUser } from './state/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);

  signIn(email: string, password: string): Observable<{ user: AuthUser; isAdmin: boolean }> {
    return from(this.supabase.client.auth.signInWithPassword({ email, password })).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        if (!data.user) throw new Error('No user returned');
        const isAdmin = data.user.user_metadata?.['role'] === 'admin';
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email ?? '',
          role: data.user.user_metadata?.['role'] ?? 'member',
        };
        return { user, isAdmin };
      })
    );
  }

  signOut(): Observable<void> {
    return from(this.supabase.client.auth.signOut()).pipe(map(() => undefined));
  }

  getUser(): Observable<AuthUser | null> {
    return from(this.supabase.client.auth.getUser()).pipe(
      map(({ data }) => {
        if (!data.user) return null;
        return {
          id: data.user.id,
          email: data.user.email ?? '',
          role: data.user.user_metadata?.['role'] ?? 'member',
        };
      })
    );
  }
}
