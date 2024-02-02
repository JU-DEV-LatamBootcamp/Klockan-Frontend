import { Component, OnInit } from '@angular/core';
import { MEETING_HEADERS } from './meeting.constants';
import { Meeting } from 'src/app/shared/models/Meetings';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.sass'],
})
export class MeetingsComponent implements OnInit {
  headers: string[] = MEETING_HEADERS;
  meetingList: Meeting[] = [];
  isLoading = true;

  constructor(
    public meetingService: MeetingService,
    private snackBar: MatSnackBar
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
    this.meetingList = data;
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
}
