import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '@truttis/core-api';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private supabase = inject(SupabaseService);

  get client() {
    return this.supabase.client;
  }
}
