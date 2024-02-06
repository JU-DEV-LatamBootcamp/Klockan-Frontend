export interface MeetingFromService {
  id: number;
  sessionNumber: number;
  date: Date;
  time: Date;
  classroomId: number;
}

export interface Meeting {
  id: number;
  sessions: number;
  date: Date;
  time: Date;
  classroom: number;
}
