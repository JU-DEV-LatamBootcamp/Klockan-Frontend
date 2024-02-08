import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { Classroom } from 'src/app/shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import {
  classroomCommonColumns,
  classroomTypeColumns,
} from './classrooms.constants';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
})
export class ClassroomsComponent implements OnInit {
  classrooms: Classroom[] = [];
  isLoading = true;
  columns = classroomTypeColumns;
  commonColumns = classroomCommonColumns;

  constructor(
    public classroomService: ClassroomService,
    private snackBar: MatSnackBar
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

  private displaySnackbar(message: string): void {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }
}
