import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { COURSE_HEADERS } from './course.constants';
import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class CoursesComponent implements OnInit {
  headers: string[] = COURSE_HEADERS;
  data: Course[] = [];
  isLoading = true;
  buttonLabel = '+ New Course';

  constructor(
    public courseService: CourseService,
    private snackBar: MatSnackBar,
    public readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.isLoading = true;
    this.courseService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(data: Course[]): void {
    this.data = data;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
    this.displaySnackbar(API_ERROR_MESSAGE);
  }

  private displaySnackbar(message: string): void {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }

  showDialogFromComponent() {
    this.dialogService.show(CoursesComponent);
  }
}
