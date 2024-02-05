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
