import { Injectable, inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '@truttis/core-api';
import { Meeting } from './models/meeting.model';

@Injectable({ providedIn: 'root' })
export class MeetingsService {
  private supabase = inject(SupabaseService);

  getMeetings(): Observable<Meeting[]> {
    return from(
      this.supabase.client
        .from('meetings')
        .select('*, attendees(*)')
        .order('date', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Meeting[];
      })
    );
  }

  getUpcomingMeetings(limit = 5): Observable<Meeting[]> {
    const today = new Date().toISOString().split('T')[0];
    return from(
      this.supabase.client
        .from('meetings')
        .select('*, attendees(*)')
        .gte('date', today)
        .order('date', { ascending: true })
        .limit(limit)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []) as Meeting[];
      })
    );
  }

  rsvp(meetingId: string, userId: string, status: 'attend' | 'decline' | 'optional'): Observable<void> {
    return from(
      this.supabase.client
        .from('meeting_attendees')
        .upsert({ meeting_id: meetingId, user_id: userId, status })
    ).pipe(map(() => undefined));
  }
}
