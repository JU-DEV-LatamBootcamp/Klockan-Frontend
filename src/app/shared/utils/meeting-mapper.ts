import { Meeting, MeetingFromService, UpdateMeeting } from '../models/Meeting';
import { transform12TimeTo24Time } from './time-mapper';

export function transformMeetingFromService(
  meetingFromService: MeetingFromService[]
): Meeting[] {
  return meetingFromService.map(
    ({ id, classroomId, sessionNumber, date, time }) => ({
      id,
      date,
      time,
      sessions: sessionNumber,
      classroom: classroomId,
    })
  );
}

export function transformToUpdateMeeting(meeting: Meeting): UpdateMeeting {
  return {
    date: transformDateToDateOnly(new Date(meeting.date) || '2024-01-01'),
    time: transform12TimeTo24Time('14:22'),
  };
}
function transformDateToDateOnly(arg0: Date): string {
  throw new Error('Function not implemented.');
}
