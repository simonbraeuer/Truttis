import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SETTINGS_KEY = 'truttis_settings';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private _client: SupabaseClient | null = null;

  private getConfig(): { supabaseUrl: string; supabaseAnonKey: string } {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { supabaseUrl: '', supabaseAnonKey: '' };
    return JSON.parse(raw) as { supabaseUrl: string; supabaseAnonKey: string };
  }

  get client(): SupabaseClient {
    const { supabaseUrl, supabaseAnonKey } = this.getConfig();
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key must be configured in Settings.');
    }
    if (!this._client) {
      this._client = createClient(supabaseUrl, supabaseAnonKey);
    }
    return this._client;
  }

  resetClient(): void {
    this._client = null;
  }
}
