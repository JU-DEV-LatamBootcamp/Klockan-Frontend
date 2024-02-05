import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { Classroom } from 'src/app/shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
})
export class ClassroomsComponent implements OnInit {
  classroomList: Classroom[] = [];
  isLoading = true;
  headers: string[] = ['id', 'course', 'program', 'starts'];
  constructor(
    public classroomService: ClassroomService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchClassrooms();
  }

  private fetchClassrooms(): void {
    this.isLoading = true;
    this.classroomService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(data: Classroom[]): void {
    this.classroomList = data;
    this.isLoading = false;
    console.log(this.classroomList);
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;

    const placeholderList = [
      {
        id: 2,
        courseId: 2,
        programId: 1,
        startDate: '2024-02-23',
        program: {
          id: 1,
          name: 'Bootcamp Developers 01',
          description: 'Program covering concepts in software development.',
        },
        course: {
          id: 2,
          name: 'Backend Development',
          description:
            'Course on server side programming, databases, and API construction.',
          sessions: 12,
          sessionDuration: 75,
        },
      },
      {
        id: 1,
        courseId: 1,
        programId: 1,
        startDate: '2024-02-23',
        program: {
          id: 1,
          name: 'Bootcamp Developers 01',
          description: 'Program covering concepts in software development.',
        },
        course: {
          id: 1,
          name: 'Frontend Development',
          description:
            'Course to develop Web Applications focusing on HTML, CSS, JavaScript, and popular frameworks.',
          sessions: 10,
          sessionDuration: 60,
        },
      },
      {
        id: 3,
        courseId: 1,
        programId: 2,
        startDate: '2024-02-23',
        program: {
          id: 2,
          name: 'Advanced Bootcamp Developers 01',
          description:
            'Program focused on advanced software design and development techniques.',
        },
        course: {
          id: 1,
          name: 'Frontend Development',
          description:
            'Course to develop Web Applications focusing on HTML, CSS, JavaScript, and popular frameworks.',
          sessions: 10,
          sessionDuration: 60,
        },
      },
    ];
    const transformedList: any[] = placeholderList.map(
      ({ id, startDate, program, course }) => ({
        id: id,
        course: course?.name,
        program: program?.name,
        starts: startDate,
        courseObject: course,
        programObject: program,
      })
    );
    this.classroomList = transformedList;

    // this.classroomList = [
    //   {
    //     id: 2,
    //     course: 'Bootcamp Developers 01',
    //     program: 'Backend Development',
    //     starts: '2024-02-23',
    //     programObject: {
    //       id: 1,
    //       name: 'Bootcamp Developers 01',
    //       description: 'Program covering concepts in software development.',
    //     },
    //     courseObject: {
    //       id: 2,
    //       name: 'Backend Development',
    //       description:
    //         'Course on server side programming, databases, and API construction.',
    //       sessions: 12,
    //       sessionDuration: 75,
    //     },
    //   },
    // ];
    this.displaySnackbar(API_ERROR_MESSAGE);
  }

  private displaySnackbar(message: string): void {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }
}
