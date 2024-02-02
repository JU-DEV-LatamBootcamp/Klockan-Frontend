export interface CourseFromService {
  id: number;
  name: string;
  description: string;
  sessions?: number;
  sessionDuration?: number;
}

export interface CourseToService {
  name: string;
  description?: string;
  sessions?: number;
  sessionDuration?: number;
}

export interface Course {
  id?: number;
  name: string;
  description: string;
  sessions?: number;
  duration?: number;
}
