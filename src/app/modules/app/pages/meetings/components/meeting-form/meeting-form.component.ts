import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from '../../../../../../shared/services/meeting.service';
import { Classroom } from '../../../../../../shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { API_ERROR_MESSAGE } from '../../../../../../shared/constants/api.constants';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.sass'],
})
export class MeetingFormComponent implements OnInit, OnDestroy {
  isLoading = true;
  classrooms: Classroom[] = [];
  subscription!: Subscription;
  isCreate = true;
  headerTypeLabel = 'Create Meeting';
  meetingForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<MeetingFormComponent>,
    private readonly meetingService: MeetingService,
    private readonly classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchClassrooms();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.meetingForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
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
  }

}
