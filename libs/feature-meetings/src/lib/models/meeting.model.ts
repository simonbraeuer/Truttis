export type RsvpStatus = 'attend' | 'decline' | 'optional';

export interface MeetingAttendee {
  userId: string;
  displayName: string;
  status: RsvpStatus;
}

export interface Meeting {
  id: string;
  date: string;
  location: string;
  address: string;
  description: string;
  photos?: string[];
  links?: string[];
  attendees: MeetingAttendee[];
}
