import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { Classroom } from 'src/app/shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import {
  classroomCommonColumns,
  classroomTypeColumns,
} from './classrooms.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { ClassroomFormComponent } from './components/classroom-form/classroom-form.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class ClassroomsComponent implements OnInit {
  classrooms: Classroom[] = [];
  isLoading = true;
  columns = classroomTypeColumns;
  commonColumns = classroomCommonColumns;

  constructor(
    private readonly dialogService: DialogService,
    private readonly snackBar: MatSnackBar,
    public readonly classroomService: ClassroomService
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
    this.classrooms = data;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
    this.displaySnackbar(API_ERROR_MESSAGE);
  }

  private displaySnackbar(
    message: string,
    customConfig?: SnackbarConfig
  ): void {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      customConfig?.CONFIG ?? SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }

  showClassroomForm(classroom?: Classroom) {
    this.dialogService
      .show(
        ClassroomFormComponent,
        classroom
          ? {
              item: classroom,
            }
          : null
      )
      .subscribe(res => {
        if (res) {
          this.fetchClassrooms();
          // TODO: show snackbar
          if (classroom) {
            this.displaySnackbar(
              `Classroom ${res.id} edited.`,
              SNACKBAR_SUCCESS_DEFAULTS
            );
          } else {
            this.displaySnackbar(
              `Classroom created successfully.`,
              SNACKBAR_SUCCESS_DEFAULTS
            );
          }
        }
      });
  }
}
