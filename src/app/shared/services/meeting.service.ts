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
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http
      .get<MeetingFromService[]>(`${this.baseRoute}${this.meetingPath}`, {
        headers,
      })
      .pipe(
        map(meetingsFromService =>
          transformMeetingFromService(meetingsFromService)
        )
      );
  }

  override create(meeting: CreateMeeting): Observable<CreateMeeting> {
    const token = this.oAuthService.getAccessToken();
    const headers = super.createHeaders(token);
    return this.http.post<CreateMeeting>(
      `${this.baseRoute}${this.meetingPath}`,
      meeting,
      { headers }
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
