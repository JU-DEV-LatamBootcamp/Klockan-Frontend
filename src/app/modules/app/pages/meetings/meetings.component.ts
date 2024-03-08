import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { meetingCommonColumns, meetingTypeColumns } from './meeting.constants';
import { Meeting, MeetingCardData } from 'src/app/shared/models/Meeting';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from '../../../../shared/layouts/app-layout/services/dialog/dialog.service';
import { MeetingFormComponent } from './components/meeting-form/meeting-form.component';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.sass'],
})
export class MeetingsComponent implements OnInit {
  meetings: MeetingCardData[] = [];
  isLoading = true;
  columns = meetingTypeColumns;
  commonColumns = meetingCommonColumns;

  constructor(
    public meetingService: MeetingService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private classroomService: ClassroomService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.isLoading = true;
    this.meetingService
      .getAll()
      .pipe()
      .subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }

  private handleSuccess(data: Meeting[]): void {
    //TODO: Improve by memoizing and caching, or automatically populate from backend
    this.meetings = data.map(meeting => {
      const cardData = { ...meeting };
      this.classroomService.getById(meeting.classroom, true).subscribe({
        next: classroom => {
          (cardData as MeetingCardData).course = classroom.courseObject;
        },
        error: this.handleError.bind(this),
      });
      return cardData;
    });
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

  public showMeetingForm(meeting?: Meeting): void {
    this.dialogService
      .show(MeetingFormComponent, meeting ? { item: meeting } : null)
      .subscribe(result => {
        this.fetchData();
        if (!meeting) {
          if (result) this.showSnackbar(result, 'Meeting created');
        } else {
          if (result) this.showSnackbar(result, 'Meeting edited');
        }
      });
  }

  public showSnackbar({ id }: Meeting, message: string): void {
    this.displaySnackbar(message, SNACKBAR_SUCCESS_DEFAULTS);
  }
}
