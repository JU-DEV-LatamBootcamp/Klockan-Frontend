import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { COURSE_HEADERS } from './course.constants';
import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
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
    this.fetchCourses();
  }

  private fetchCourses(): void {
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

  showDialogFormComponent(course?: Course): void {
    const dialogRef$ = this.dialogService.show(
      CourseFormComponent,
      course ? course : null
    );

    dialogRef$.subscribe({
      next: (result: Course) => {
        if (result) this.fetchCourses();
      },
    });
  }

  showDeleteDialog(course: Course) {
    this.dialogService
      .showDeleteConfirmation(DeleteConfirmationComponent<Course>, {
        item: course,
        identifier: 'name',
      })
      .subscribe(confirmed => {
        if (!confirmed) return;

        this.deleteCourse(course);
      });
  }

  private deleteCourse(course: Course) {
    this.courseService.delete(course).subscribe({
      next: () => {
        this.fetchCourses();
      },
      error: error => {
        this.dialogService.showErrorMessage(ErrorMessageComponent, error.error);
      },
    });
  }
}
