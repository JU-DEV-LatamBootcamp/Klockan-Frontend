import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from '../../../../../../shared/services/meeting.service';
import { Classroom } from '../../../../../../shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { API_ERROR_MESSAGE } from '../../../../../../shared/constants/api.constants';
import { User } from '../../../../../../shared/models/User';
import { UserService } from '../../../../../../shared/services/user.service';
import { SelectOption } from '../../../../../../shared/interfaces/select-options';
import { map } from 'rxjs/operators';
import { Meeting } from '../../../../../../shared/models/Meetings';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.sass'],
})
export class MeetingFormComponent implements OnInit, OnDestroy {
  isLoading = true;
  classroomOptions: SelectOption[] = [];
  studentOptions: SelectOption[] = [];
  trainerOptions: SelectOption[] = [];
  subscription!: Subscription;
  headerTypeLabel = 'Create Meeting';
  meetingForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<MeetingFormComponent>,
    private readonly meetingService: MeetingService,
    private readonly classroomService: ClassroomService,
    private readonly userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Meeting }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUsersOptions();
    this.fetchClassroomOptions();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.meetingForm = this.formBuilder.group({
      classroom: [null, Validators.required],
      students: [[]],
      trainer: [null, Validators.required],
      startingDate: [null, Validators.required],
      startingTime: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.meetingForm.invalid) {
      const formData = this.meetingForm.value;
      const meeting = {
        date: this.getDateObject(formData.startingDate),
        time: this.getTimeObject(formData.startingTime),
        classroomId: formData.classroom,
        trainerId: formData.trainer,
        users: formData.students,
      };
      console.log(meeting);
    } else {
      Object.keys(this.meetingForm.controls).forEach(key => {
        this.meetingForm?.get(key)?.markAsTouched();
      });
    }
  }

  private fetchClassroomOptions(): void {
    this.isLoading = true;
    this.classroomService
      .getAll()
      .pipe(
        map((classrooms: Classroom[]): SelectOption[] =>
          classrooms.map(classroom => ({
            label: 'Classroom ' + classroom.id,
            value: classroom.id?.toString(),
          }))
        )
      )
      .subscribe(options => {
        this.classroomOptions = options;
      });
  }

  private fetchUsersOptions(): void {
    this.userService
      .getAll()
      .pipe(
        map(
          (
            users: User[]
          ): { trainers: SelectOption[]; students: SelectOption[] } => {
            const trainers: SelectOption[] = users
              .filter(user => user.role.id === 2)
              .map(user => ({
                label: user.lastName + ' ' + user.firstName,
                value: user.id.toString(),
              }));

            const students: SelectOption[] = users
              .filter(user => user.role.id === 3)
              .map(user => ({
                label: user.lastName + ' ' + user.firstName,
                value: user.id.toString(),
              }));

            return { trainers, students };
          }
        )
      )
      .subscribe({
        next: ({ trainers, students }) => {
          this.trainerOptions = trainers;
          this.studentOptions = students;
        },
        error: this.handleError.bind(this),
      });
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
  }

  private getTimeObject(timeString: string): { hour: number; minute: number } {
    const parts = timeString.split(':');
    const hour = parseInt(parts[0], 10);
    let minute = 0;
    if (parts[1].includes('PM')) {
      minute = parseInt(parts[1].split(' ')[0], 10) + 12;
    } else {
      minute = parseInt(parts[1].split(' ')[0], 10);
    }
    return { hour, minute };
  }

  private getDateObject(dateInput: Date): {
    year: number;
    month: number;
    day: number;
  } {
    // Extract year, month, and day from the Date object
    const year = dateInput.getFullYear();
    const month = dateInput.getMonth() + 1; // Months are zero-based, so add 1
    const day = dateInput.getDate();

    return { year, month, day };
  }

  public getFieldError(field: string): string | null {
    const control = this.meetingForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }
}
