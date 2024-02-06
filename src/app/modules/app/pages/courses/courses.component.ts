import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import { COURSE_HEADERS } from './course.constants';
import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

import { CourseFormComponent } from './components/course-form/course-form.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;
  public isSidenavOpen = true;
  public isLoading = true;

  public readonly headers: string[] = COURSE_HEADERS;
  public data: Course[] = [];

  constructor(
    public readonly courseService: CourseService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogService: DialogService
  ) {
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
    this.displaySnackbar(API_ERROR_MESSAGE, SNACKBAR_ERROR_DEFAULTS);
  }

  private displaySnackbar(message: string, customConfig: SnackbarConfig): void {
    this.snackBar.open(
      message,
      customConfig.CLOSE_BUTTON_TEXT,
      customConfig.CONFIG
    );
  }

  public showFormDialog(course?: Course): void {
    this.dialogService
      .show(CourseFormComponent, course ?? null)
      .subscribe(result => {
        console.log(result);
        if (result && course) {
          this.displayEditSnackbar(result);
        } else if (result) {
          this.displayCreateSnackbar(result);
        }
        this.fetchCourses();
      });
  }

  private displayCreateSnackbar({ name }: Course): void {
    this.displaySnackbar(`Course ${name} created`, SNACKBAR_SUCCESS_DEFAULTS);
  }

  private displayEditSnackbar({ name }: Course): void {
    this.displaySnackbar(`Course ${name} edited`, SNACKBAR_SUCCESS_DEFAULTS);
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
