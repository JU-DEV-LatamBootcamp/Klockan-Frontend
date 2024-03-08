import {
  Classroom,
  ClassroomFromService,
  UpdateClassroom,
} from '../models/Classroom';
import { Schedule } from '../models/Schedule';
import { transformStringDateToDateOnly } from './date-mapper';

export function transformClassroomFromServiceArray(
  classroomsFromService: ClassroomFromService[]
): Classroom[] {
  return classroomsFromService.map(classroom =>
    transformClassroomFromService(classroom)
  );
}

export function transformClassroomFromService(
  classroomsFromService: ClassroomFromService
): Classroom {
  return {
    id: classroomsFromService.id,
    course: classroomsFromService.course?.name,
    program: classroomsFromService.program?.name,
    starts: classroomsFromService.startDate,
    courseObject: classroomsFromService.course,
    programObject: classroomsFromService.program,
  };
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

export function transformToCreateClassroom(
  classroom: Classroom
): UpdateClassroom {
  return {
    courseId: parseInt(classroom.courseObject?.id?.toString() || '-1'),
    programId: parseInt(classroom.programObject?.id.toString() || '-1'),
    startDate: transformStringDateToDateOnly(classroom.starts || '2024-01-01'),
    schedule: classroom.schedule || [],
  };
}

export function transformToUpdateClassroom(
  classroom: Classroom
): UpdateClassroom {
  return {
    courseId: parseInt(classroom.courseObject?.id?.toString() || '-1'),
    programId: parseInt(classroom.programObject?.id.toString() || '-1'),
    startDate: transformStringDateToDateOnly(classroom.starts || '2024-01-01'),
    schedule:
      classroom.schedule?.map(s => {
        const schedule: Schedule = {
          startTime: s.startTime,
          weekdayId: s.weekdayId,
        };

        if (s.id) {
          schedule.id = s.id;
        }

        return schedule;
      }) || [],
  };
}
