import { Course, CourseFromService, CourseToService } from '../models/Courses';

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

export function transformCourseToService(course: Course): CourseToService {
  const { name, description, sessions, duration } = course;
  return {
    name,
    description,
    sessions,
    sessionDuration: duration,
  };
}
