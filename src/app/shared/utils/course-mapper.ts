import { Course, CourseFromService } from '../models/Courses';

export function transformCourseFromService(
  coursesFromService: CourseFromService[]
): Course[] {
  return coursesFromService.map(
    ({ id, name, code, description, sessions, sessionDuration }) => ({
      id,
      name,
      code,
      description,
      sessions,
      duration: sessionDuration,
    })
  );
}
