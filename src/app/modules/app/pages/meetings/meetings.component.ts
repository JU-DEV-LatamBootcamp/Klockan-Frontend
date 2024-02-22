import { Component, OnInit } from '@angular/core';
import { meetingCommonColumns, meetingTypeColumns } from './meeting.constants';
import { Meeting } from 'src/app/shared/models/Meetings';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { ProgramFormComponent } from '../programs/components/program-form/program-form.component';
import { DialogService } from '../../../../shared/layouts/app-layout/services/dialog/dialog.service';
import { MeetingFormComponent } from './components/meeting-form/meeting-form.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.sass'],
})
export class MeetingsComponent implements OnInit {
  meetings: Meeting[] = [];
  isLoading = true;
  columns = meetingTypeColumns;
  commonColumns = meetingCommonColumns;

  constructor(
    public meetingService: MeetingService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    this.isLoading = true;
    this.meetingService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleSuccess(data: Meeting[]): void {
    this.meetings = data;
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

  public showCreateDialog(): void {
    this.dialogService.show(MeetingFormComponent).subscribe(result => {
      if (result) this.createMeeting(result);
    });
  }

  public createMeeting({ id }: Meeting): void {
    this.displaySnackbar(`Meeting created`, SNACKBAR_SUCCESS_DEFAULTS);
    this.fetchData();
  }
}
