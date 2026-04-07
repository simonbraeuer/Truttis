import { Injectable } from '@angular/core';
import { AppSettings, SETTINGS_KEY } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  getSettings(): AppSettings {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { supabaseUrl: '', supabaseAnonKey: '' };
    return JSON.parse(raw) as AppSettings;
  }

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.getSettings()[key];
  }

  setSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }
}
