import { Classroom, ClassroomFromService } from '../models/Classroom';

export function transformClassroom(
  classroomsFromService: ClassroomFromService[]
): any[] {
  return classroomsFromService.map(({ id, startDate, program, course }) => ({
    id,
    course: course?.name,
    program: program?.name,
    starts: startDate,
    courseObject: course,
    programObject: program,
  }));
}
