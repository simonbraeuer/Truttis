import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectUser, selectIsAdmin } from '@truttis/feature-auth';
import { MeetingsService, Meeting } from '@truttis/feature-meetings';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="tiles">

        <!-- Calendar Tile -->
        <div class="tile calendar-tile">
          <h3>📅 Upcoming Meetings</h3>
          @if (upcomingMeetings$ | async; as meetings) {
            <ul>
              @for (m of meetings; track m.id) {
                <li>
                  <span class="meeting-date">{{ m.date | date:'shortDate' }}</span>
                  <span class="meeting-loc">{{ m.location }}</span>
                </li>
              } @empty {
                <li class="empty-item">No upcoming meetings</li>
              }
            </ul>
          } @else {
            <p>Loading…</p>
          }
        </div>

        <!-- Statistics Tile -->
        <div class="tile stats-tile">
          <h3>📊 Statistics {{ currentYear }}</h3>
          <p>Attendance statistics for this year will appear here once meetings data is available.</p>
          @if (user$ | async; as user) {
            <div class="stat-item">Logged in as: <strong>{{ user.email }}</strong></div>
          }
          @if (isAdmin$ | async) {
            <div class="stat-item admin-badge">🔑 Admin</div>
          }
        </div>

        <!-- RSVP Tile -->
        <div class="tile rsvp-tile">
          <h3>✅ RSVP</h3>
          @if (nextMeeting$ | async; as meeting) {
            <p>
              Next: <strong>{{ meeting.date | date:'mediumDate' }}</strong>
              at {{ meeting.location }}
            </p>
            <div class="rsvp-buttons">
              <button class="btn-attend">✓ Attend</button>
              <button class="btn-decline">✗ Decline</button>
              <button class="btn-optional">? Maybe</button>
            </div>
          } @else {
            <p class="empty-msg">No upcoming meetings to RSVP to</p>
          }
        </div>

        <!-- Flashback Tile -->
        <div class="tile flashback-tile">
          <h3>🎉 Flashback</h3>
          @if (lastMeeting$ | async; as meeting) {
            <p><strong>{{ meeting.date | date:'mediumDate' }}</strong> · {{ meeting.location }}</p>
            <p>{{ meeting.description }}</p>
            @if (meeting.photos && meeting.photos.length > 0) {
              <div class="photos">
                @for (photo of meeting.photos.slice(0, 3); track photo) {
                  <img [src]="photo" alt="Meeting photo" />
                }
              </div>
            }
          } @else {
            <p class="empty-msg">No past meetings yet</p>
          }
        </div>

      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding:1.5rem; }
    h1 { margin-bottom:1.5rem; }
    .tiles { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; }
    .tile { background:white; border-radius:8px; padding:1.5rem; box-shadow:0 2px 8px rgba(0,0,0,.1); }
    .tile h3 { margin-top:0; color:#333; border-bottom:1px solid #eee; padding-bottom:.5rem; }
    ul { list-style:none; padding:0; margin:0; }
    li { display:flex; justify-content:space-between; padding:.25rem 0; border-bottom:1px solid #f0f0f0; }
    .meeting-date { color:#007bff; font-weight:500; }
    .stat-item { font-size:.9rem; margin:.25rem 0; }
    .admin-badge { color:#7c3aed; font-weight:600; }
    .rsvp-buttons { display:flex; gap:.5rem; margin-top:1rem; flex-wrap:wrap; }
    .btn-attend { background:#28a745; color:white; border:none; padding:.5rem 1rem; border-radius:4px; cursor:pointer; }
    .btn-decline { background:#dc3545; color:white; border:none; padding:.5rem 1rem; border-radius:4px; cursor:pointer; }
    .btn-optional { background:#ffc107; color:#333; border:none; padding:.5rem 1rem; border-radius:4px; cursor:pointer; }
    .photos { display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.5rem; }
    .photos img { width:80px; height:80px; object-fit:cover; border-radius:4px; }
    .empty-item, .empty-msg { color:#888; font-size:.9rem; }
  `],
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  private meetingsService = inject(MeetingsService);

  user$ = this.store.select(selectUser);
  isAdmin$ = this.store.select(selectIsAdmin);
  upcomingMeetings$!: Observable<Meeting[]>;
  nextMeeting$!: Observable<Meeting | null>;
  lastMeeting$!: Observable<Meeting | null>;
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.upcomingMeetings$ = this.meetingsService.getUpcomingMeetings(5);
    this.nextMeeting$ = this.meetingsService.getUpcomingMeetings(1).pipe(
      map(meetings => meetings[0] ?? null)
    );
    this.lastMeeting$ = of(null); // Will be loaded from past meetings in a future iteration
  }
}
