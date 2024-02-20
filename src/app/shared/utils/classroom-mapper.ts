import { DateOnly } from '../interfaces/date-only';
import {
  Classroom,
  ClassroomFromService,
  UpdateClassroom,
} from '../models/Classroom';

export function transformClassroomFromService(
  classroomsFromService: ClassroomFromService[]
): Classroom[] {
  return classroomsFromService.map(({ id, startDate, program, course }) => ({
    id,
    course: course?.name,
    program: program?.name,
    starts: startDate,
    courseObject: course,
    programObject: program,
  }));
}

export function transformToClassroomFromService(
  classroom: Classroom
): ClassroomFromService {
  return {
    id: classroom.id || -1,
    courseId: classroom.courseObject?.id,
    programId: classroom.programObject?.id,
    startDate: classroom.starts,
    course: classroom.courseObject,
    program: classroom.programObject,
  };
}

export function transformToUpdateClassroom(
  classroom: Classroom
): UpdateClassroom {
  return {
    courseId: parseInt(classroom.courseObject?.id?.toString() || '-1'),
    programId: parseInt(classroom.programObject?.id.toString() || '-1'),
    startDate: transformDateToDateOnly(
      classroom.starts ? new Date(classroom.starts) : undefined
    ),
  };
}

export function transformDateToDateOnly(date?: Date): string {
  return date
    ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    : '2024-01-01';
}
