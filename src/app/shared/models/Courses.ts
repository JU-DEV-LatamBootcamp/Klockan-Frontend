export interface CourseFromService {
  id: number;
  name: string;
  code: string;
  description: string;
  sessions?: number;
  sessionDuration?: number;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  sessions?: number;
  duration?: number;
}
