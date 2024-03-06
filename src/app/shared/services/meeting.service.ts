import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { CreateMeeting, Meeting, MeetingFromService } from '../models/Meetings';
import { Observable, map } from 'rxjs';
import { transformMeetingFromService } from '../utils/meeting-mapper';

@Injectable({
  providedIn: 'root',
})
export class MeetingService extends BaseService<Meeting | CreateMeeting> {
  meetingPath = environment.api.meetingsEndpoint;

  override getAll(): Observable<Meeting[]> {
    return this.http
      .get<MeetingFromService[]>(`${this.baseRoute}${this.meetingPath}`)
      .pipe(
        map(meetingsFromService =>
          transformMeetingFromService(meetingsFromService)
        )
      );
  }

  override create(meeting: CreateMeeting): Observable<CreateMeeting> {
    return this.http.post<CreateMeeting>(
      `${this.baseRoute}${this.meetingPath}`,
      meeting
    );
  }

  override edit(entity: Meeting): Observable<Meeting> {
    alert('Editing MEETING' + entity.id);
    throw new Error('Method not implemented.');
  }
  override delete(entity: Meeting): Observable<Meeting> {
    alert('Deleting MEETING' + entity.id);
    throw new Error('Method not implemented.');
  }
}
