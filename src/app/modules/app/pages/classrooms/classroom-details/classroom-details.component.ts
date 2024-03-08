import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { PanelService } from 'src/app/shared/layouts/app-layout/services/panel/panel.service';
import { Classroom } from 'src/app/shared/models/Classroom';
import { User } from 'src/app/shared/models/User';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.sass'],
})
export class ClassroomDetailsComponent implements OnInit {
  classroom: Classroom = {
    id: 1,
  };
  classroomUsers: User[] = [];
  isLoading = true;
  errorOcurred = false;
  weekdays: { [key: string]: string } = {
    '1': 'Sunday',
    '2': 'Monday',
    '3': 'Tuesday',
    '4': 'Wednesday',
    '5': 'Thursday',
    '6': 'Friday',
    '7': 'Saturday',
  };
  formattedSchedule: { [key: string]: string[] } = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  constructor(
    private readonly dialogService: DialogService,
    private readonly panelService: PanelService,
    private readonly snackBar: MatSnackBar,
    public readonly classroomService: ClassroomService,
    public readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const classroomId = parseInt(idParam ?? '');
    const dataObservable = concat(
      this.classroomService.get(classroomId),
      this.classroomService.getUsers(classroomId)
    );
    dataObservable.subscribe({
      next: value => {
        if (!Array.isArray(value)) {
          this.classroom = {
            id: value.id,
            course: value.course?.name,
            program: value.program?.name,
            courseObject: value.course,
            programObject: value.program,
            starts: value.startDate,
            schedule: value.schedule,
          };
          for (const schedule of this.classroom.schedule ?? []) {
            const weekdayLabel = this.weekdays[schedule.weekdayId];

            this.formattedSchedule[weekdayLabel]?.push(schedule.startTime);
          }
          return;
        }
        this.classroomUsers = value;
        this.isLoading = false;
      },
      error: error => {
        if (error instanceof HttpErrorResponse) {
          this.displayError(error);
          this.errorOcurred = true;
        }
      },
    });
  }

  private displayError(error: HttpErrorResponse) {
    let message = 'An unknow error ocurred.';
    if (error.status === 404) {
      message = 'Data not found: 404.';
    } else if (error.status >= 500) {
      message = 'Server error, please report.';
    }
    this.displaySnackBar(message);
  }

  private displaySnackBar(message: string, customConfig?: SnackbarConfig) {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      customConfig?.CONFIG ?? SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }

  getSchedulesForDay(day: string): string[] {
    return this.formattedSchedule[day];
  }

  onRemoveUserButtonClick(user: User): void {
    this.dialogService
      .showDeleteConfirmation(DeleteConfirmationComponent<User>, {
        item: user,
        identifier: 'firstName',
      })
      .subscribe(confirmed => {
        if (!confirmed) return;
        this.removeUserFromList(user);
      });
  }

  removeUserFromList(user: User): void {
    this.classroomService
      .removeUserFromClassroom(this.classroom.id, user.id)
      .subscribe({
        next: deletedUser => {
          this.classroomUsers = this.classroomUsers.filter(
            value => value.id !== deletedUser.id
          );
          this.snackBar.open('User removed');
        },
        error: (error: HttpErrorResponse) => {
          this.displayError(error);
        },
      });
  }
}
