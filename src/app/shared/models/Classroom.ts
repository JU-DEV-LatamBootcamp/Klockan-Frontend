import { DateOnly } from '../interfaces/date-only';
import { Course } from './Courses';
import { Program } from './Programs';

export interface ClassroomFromService {
  id: number;
  courseId?: number;
  programId?: number;
  startDate?: string;
  program?: Program;
  course?: Course;
}

export interface Classroom {
  id?: number;
  course?: string;
  program?: string;
  starts?: string;
  courseObject?: Course;
  programObject?: Program;
}

export interface UpdateClassroom {
  programId: number;
  courseId: number;
  startDate: string;
}
