import { Course, CourseFromService } from '../models/Courses';

export function transformCourseFromService(
  coursesFromService: CourseFromService[]
): Course[] {
  return coursesFromService.map(
    ({ id, name, description, sessions, sessionDuration }) => ({
      id,
      name,
      description,
      sessions,
      duration: sessionDuration,
    })
  );
}
