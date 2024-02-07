import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { courseCommonColumns, courseTypeColumns } from './courses.constants';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit {
  columns = courseTypeColumns;
  commonColumns = courseCommonColumns;
  courses: Course[] = [];
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
    this.courses = data;
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

  showDialogFromComponent(): void {
    this.dialogService.show(CourseFormComponent);
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
