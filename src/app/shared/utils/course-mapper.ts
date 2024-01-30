import { Course, CourseFromService } from '../models/Courses';

export function transformCourseFromService(
  coursesFromService: CourseFromService[]
): Course[] {
  return coursesFromService.map(courseFromService => ({
    id: courseFromService.id,
    name: courseFromService.name,
    code: courseFromService.code,
    description: courseFromService.description,
    sessions: courseFromService.sessions,
    duration: courseFromService.sessionDuration,
  }));
}
