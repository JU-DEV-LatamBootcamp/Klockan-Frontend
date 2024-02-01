import { Meeting, MeetingFromService } from '../models/Meetings';

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
