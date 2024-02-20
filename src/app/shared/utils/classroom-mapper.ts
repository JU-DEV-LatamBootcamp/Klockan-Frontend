import { Classroom, ClassroomFromService } from '../models/Classroom';

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
