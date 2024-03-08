import { Schedule } from './Schedule';
import { Course } from './Courses';

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

export interface MeetingCardData extends Meeting {
  course?: Course;
  program?: string;
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
export interface CreateMultipleMeeting {
  startdate: string;
  quantity: number;
  classroomId: number;
  schedules?: Schedule[];
}
