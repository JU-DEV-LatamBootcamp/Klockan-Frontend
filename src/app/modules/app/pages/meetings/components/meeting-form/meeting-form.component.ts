import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from '../../../../../../shared/services/meeting.service';
import { Classroom } from '../../../../../../shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { API_ERROR_MESSAGE } from '../../../../../../shared/constants/api.constants';
import { User } from '../../../../../../shared/models/User';
import { UserService } from '../../../../../../shared/services/user.service';
import { SelectOption } from '../../../../../../shared/interfaces/select-options';
import { map } from 'rxjs/operators';
import {
  CreateMeeting,
  Meeting,
} from '../../../../../../shared/models/Meeting';
import getTimeOnlyFromString from '../../../../../../shared/utils/date-only-formater';

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
  todayDate: Date = new Date();
  isEdit = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<MeetingFormComponent>,
    private readonly meetingService: MeetingService,
    private readonly classroomService: ClassroomService,
    private readonly userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Meeting }
  ) {}

  get requestHandler(): any {
    return {
      next: (meeting: CreateMeeting | Meeting) => {
        this.dialogRef.close(meeting);
      },
      error: (error: Error) => {
        console.error(
          `Error ${this.data ? 'editing' : 'creating'} meeting:`,
          error
        );
      },
    };
  }

  ngOnInit(): void {
    this.headerTypeLabel = this.data ? 'Edit meeting' : 'Create Meeting';
    this.isEdit = !!this.data;
    console.log(this.data);
    this.initializeForm();
    this.fetchUsersOptions();
    this.fetchClassroomOptions();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const formData = this.meetingForm.value;

    if (!this.data) {
      if (!this.meetingForm.invalid) {
        const meeting = {
          date: this.formatDateToDateOnly(formData.startingDate),
          time: getTimeOnlyFromString(formData.startingTime),
          classroomId: formData.classroom,
          trainerId: formData.trainer,
          users: formData.students,
        };
        this.meetingService.create(meeting).subscribe(this.requestHandler);
      } else {
        Object.keys(this.meetingForm.controls).forEach(key => {
          this.meetingForm?.get(key)?.markAsTouched();
        });
      }
    } else {
      const meeting: Meeting = {
        ...this.data.item,
        time: formData.startingTime,
        date: formData.startingDate,
      };
      this.meetingService.edit(meeting).subscribe(this.requestHandler);
    }
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

  private initializeForm(): void {
    const classroomControl = new FormControl(
      {
        value: this.data ? this.data.item.classroom : '',
        disabled: this.isEdit,
      },
      Validators.required
    );

    this.meetingForm = this.formBuilder.group({
      classroom: classroomControl,
      students: [[]],
      trainer: [null, !this.isEdit ? Validators.required : null],
      startingDate: [
        this.data ? this.data.item.date : null,
        Validators.required,
      ],
      startingTime: [
        this.data ? this.transformTime(this.data.item.time.toString()) : null,
        Validators.required,
      ],
    });
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

  private formatDateToDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  transformTime(meetingTime: string): string {
    const time = new Date('2000-01-01T' + meetingTime);
    return time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
}
