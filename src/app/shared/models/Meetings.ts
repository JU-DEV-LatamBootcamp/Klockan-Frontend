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
  users?: number[];
  trainer?: number;
}

export interface CreateMeeting {
  date: string;
  time: string;
  classroomId: number;
  trainerId: number;
  users: number[];
}

export interface UpdateMeeting {
  date: string;
  time: string;
}
