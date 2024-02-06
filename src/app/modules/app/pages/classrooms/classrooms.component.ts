import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { Classroom } from 'src/app/shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.sass'],
})
export class ClassroomsComponent implements OnInit {
  classroomList: Classroom[] = [];
  isLoading = true;
  headers: string[] = ['id', 'course', 'program', 'starts'];
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
    this.classroomList = data;
    this.isLoading = false;
    console.log(this.classroomList);
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
