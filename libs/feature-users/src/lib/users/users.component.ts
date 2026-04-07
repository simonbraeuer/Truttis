import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '@truttis/feature-auth';

@Component({
  selector: 'lib-users',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="users-container">
      <h2>👥 User Management</h2>
      @if (isAdmin$ | async) {
        <p>Create and manage club members here. Full user CRUD will be available once the backend is connected.</p>
        <div class="placeholder-card">
          <span>➕ Add User</span>
        </div>
      } @else {
        <div class="not-admin">
          🔒 You need admin privileges to access this page.
        </div>
      }
    </div>
  `,
  styles: [`
    .users-container { max-width:800px; margin:0 auto; padding:1.5rem; }
    .not-admin { background:#fff3cd; color:#856404; padding:1rem; border-radius:6px; border:1px solid #ffc107; }
    .placeholder-card { background:white; border:2px dashed #ccc; border-radius:8px; padding:2rem; text-align:center; color:#888; margin-top:1rem; cursor:pointer; }
  `],
})
export class UsersComponent {
  private store = inject(Store);
  isAdmin$ = this.store.select(selectIsAdmin);
}
