import { Course } from './Courses';
import { Program } from './Programs';
import { Schedule } from './Schedule';

export interface ClassroomFromService {
  id: number;
  courseId?: number;
  programId?: number;
  startDate?: string;
  program?: Program;
  course?: Course;
}

export interface Classroom {
  id: number;
  course?: string;
  program?: string;
  starts?: string;
  courseObject?: Course;
  programObject?: Program;
  schedule?: Schedule[];
}

export interface CreateClassroom {
  programId: number;
  courseId: number;
  startDate: string;
  schedule: Schedule[];
}

export interface UpdateClassroom {
  programId: number;
  courseId: number;
  startDate: string;
  schedule: Schedule[];
}
