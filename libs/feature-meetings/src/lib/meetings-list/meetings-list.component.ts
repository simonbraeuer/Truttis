import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../meetings.service';
import { Meeting } from '../models/meeting.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-meetings-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="meetings-container">
      <h2>📋 Meetings</h2>
      @for (meeting of meetings$ | async; track meeting.id) {
        <div class="meeting-card">
          <div class="meeting-header">
            <span class="meeting-date">{{ meeting.date | date:'fullDate' }}</span>
            <span class="meeting-loc">📍 {{ meeting.location }}</span>
          </div>
          <p class="meeting-address">{{ meeting.address }}</p>
          <p class="meeting-description">{{ meeting.description }}</p>
          @if (meeting.links && meeting.links.length > 0) {
            <div class="meeting-links">
              @for (link of meeting.links; track link) {
                <a [href]="link" target="_blank" rel="noopener">🔗 Link</a>
              }
            </div>
          }
          @if (meeting.attendees.length > 0) {
            <div class="attendees">
              <strong>Attendees ({{ meeting.attendees.length }}):</strong>
              <div class="rsvp-summary">
                <span class="attend">✓ {{ attending(meeting) }}</span>
                <span class="decline">✗ {{ declining(meeting) }}</span>
                <span class="optional">? {{ optional(meeting) }}</span>
              </div>
            </div>
          }
        </div>
      } @empty {
        <p class="empty">No meetings found.</p>
      }
    </div>
  `,
  styles: [`
    .meetings-container { max-width:800px; margin:0 auto; padding:1.5rem; }
    h2 { margin-bottom:1rem; }
    .meeting-card { background:white; border-radius:8px; padding:1.25rem; margin-bottom:1rem; box-shadow:0 1px 4px rgba(0,0,0,.1); }
    .meeting-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem; }
    .meeting-date { font-weight:700; color:#007bff; }
    .meeting-address { color:#666; font-size:.9rem; margin:.25rem 0; }
    .meeting-description { margin:.5rem 0; }
    .meeting-links { display:flex; gap:.5rem; flex-wrap:wrap; margin:.5rem 0; }
    .meeting-links a { color:#007bff; font-size:.9rem; }
    .rsvp-summary { display:flex; gap:1rem; margin-top:.25rem; font-size:.9rem; }
    .attend { color:#28a745; } .decline { color:#dc3545; } .optional { color:#ffc107; }
    .empty { color:#888; text-align:center; margin-top:2rem; }
  `],
})
export class MeetingsListComponent implements OnInit {
  private meetingsService = inject(MeetingsService);
  meetings$!: Observable<Meeting[]>;

  ngOnInit(): void {
    this.meetings$ = this.meetingsService.getMeetings();
  }

  attending(m: Meeting): number {
    return m.attendees.filter(a => a.status === 'attend').length;
  }
  declining(m: Meeting): number {
    return m.attendees.filter(a => a.status === 'decline').length;
  }
  optional(m: Meeting): number {
    return m.attendees.filter(a => a.status === 'optional').length;
  }
}
