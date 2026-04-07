export interface AppUser {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'organizer';
  displayName?: string;
}
