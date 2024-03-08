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
import {
  ClassroomFormComponent,
  ClassroomFormData,
} from './components/classroom-form/classroom-form.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';

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
    private readonly panelService: OPanelService,
    private readonly snackBar: MatSnackBar,
    public readonly classroomService: ClassroomService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
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

  onCreated() {
    this.fetchClassrooms();
    this.displaySnackbar(
      `Classroom created successfully.`,
      SNACKBAR_SUCCESS_DEFAULTS
    );
  }

  onEdited(classroom: Classroom) {
    this.fetchClassrooms();
    this.displaySnackbar(
      `Classroom ${classroom.id} edited.`,
      SNACKBAR_SUCCESS_DEFAULTS
    );
  }

  private displayDeleteSnackbar({ course }: Classroom): void {
    this.displaySnackbar(`Classroom for ${course} deleted.`);
  }

  showDeleteDialog(classroom: Classroom) {
    this.dialogService
      .showDeleteConfirmation(DeleteConfirmationComponent<Classroom>, {
        item: classroom,
        identifier: 'course',
      })
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.deleteClassroom(classroom);
      });
  }

  private deleteClassroom(classroom: Classroom) {
    this.classroomService.delete(classroom).subscribe({
      next: () => {
        this.displayDeleteSnackbar(classroom);
        this.fetchClassrooms();
      },
      error: error => {
        this.dialogService.showErrorMessage(ErrorMessageComponent, error.error);
      },
    });
  }

  navigateToDetailsPage(classroom: Classroom) {
    this.router.navigate([classroom.id], { relativeTo: this.activatedRoute });
  }

  openClassroomForm(classroom?: Classroom) {
    this.panelService.openFromComponent(ClassroomFormComponent);
    this.panelService.setData<ClassroomFormData>({
      classroom,
      onSuccess: classroom
        ? this.onEdited.bind(this)
        : this.onCreated.bind(this),
    });
    this.panelService.open();
  }
}
