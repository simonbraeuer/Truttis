import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { SupabaseService } from '@truttis/core-api';

@Component({
  selector: 'lib-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="settings-container">
      <h2>⚙️ Settings</h2>
      <p class="info">
        Configure your Supabase connection. These values are stored locally in your browser
        and are required before signing in.
      </p>
      <form [formGroup]="form" (ngSubmit)="save()">
        <div class="form-group">
          <label for="supabaseUrl">Supabase URL</label>
          <input id="supabaseUrl" type="url" formControlName="supabaseUrl"
                 placeholder="https://your-project.supabase.co" />
        </div>
        <div class="form-group">
          <label for="supabaseAnonKey">Supabase Anon Key</label>
          <input id="supabaseAnonKey" type="text" formControlName="supabaseAnonKey"
                 placeholder="eyJhbGciOiJ..." />
        </div>
        <button type="submit" [disabled]="form.invalid">Save Settings</button>
        @if (saved) {
          <span class="saved-msg">✓ Settings saved!</span>
        }
      </form>
    </div>
  `,
  styles: [`
    .settings-container { max-width:600px; margin:2rem auto; padding:1.5rem; background:white; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,.1); }
    .info { color:#666; font-size:.9rem; margin-bottom:1.5rem; }
    .form-group { margin-bottom:1rem; }
    label { display:block; margin-bottom:.25rem; font-weight:600; }
    input { width:100%; padding:.6rem; border:1px solid #ccc; border-radius:4px; box-sizing:border-box; font-size:.95rem; }
    button { padding:.6rem 1.2rem; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer; font-size:.95rem; }
    button:disabled { opacity:.5; cursor:not-allowed; }
    .saved-msg { margin-left:1rem; color:green; font-size:.9rem; }
  `],
})
export class SettingsComponent implements OnInit {
  private settingsService = inject(SettingsService);
  private supabaseService = inject(SupabaseService);
  private fb = inject(FormBuilder);
  saved = false;

  form = this.fb.group({
    supabaseUrl: ['', Validators.required],
    supabaseAnonKey: ['', Validators.required],
  });

  ngOnInit(): void {
    const settings = this.settingsService.getSettings();
    this.form.patchValue(settings);
  }

  save(): void {
    if (this.form.valid) {
      this.settingsService.saveSettings(
        this.form.value as { supabaseUrl: string; supabaseAnonKey: string }
      );
      this.supabaseService.resetClient();
      this.saved = true;
      setTimeout(() => (this.saved = false), 3000);
    }
  }
}
