import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { map, tap } from 'rxjs';
import { weekdayOptions } from 'src/app/shared/constants/weekday-options';
import { SelectOption } from 'src/app/shared/interfaces/select-options';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';
import { Classroom } from 'src/app/shared/models/Classroom';
import { Course } from 'src/app/shared/models/Courses';
import { CreateMultipleMeeting } from 'src/app/shared/models/Meeting';
import { Schedule } from 'src/app/shared/models/Schedule';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { MeetingService } from 'src/app/shared/services/meeting.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import {
  transform12TimeTo24Time,
  transformDateTimeToTimePickerString,
} from 'src/app/shared/utils/time-mapper';
import {
  UpdateUsersFormComponent,
  UpdateUsersFormData,
} from '../update-users-form/update-users-form.component';

export type ScheduleForm = FormGroup<{
  id: FormControl<string | null>;
  weekday: FormControl<string | null>;
  startingTime: FormControl<string | null>;
}>;

export type ClassroomFormData = {
  classroom?: Classroom;
  onSuccess?: (classroom: Classroom) => void;
  onError?: (error: unknown) => void;
};

@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class ClassroomFormComponent implements OnInit {
  classroomForm!: FormGroup;
  programOptions: SelectOption[] = [];
  courseOptions: SelectOption[] = [];
  courses: Course[] = [];
  weekdayOptions = weekdayOptions;
  defaultDuration?: string;
  data?: ClassroomFormData;
  isEditing = false;
  duration = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly classroomService: ClassroomService,
    public readonly meetingService: MeetingService,
    public readonly programService: ProgramService,
    public readonly courseService: CourseService,
    public readonly panelService: OPanelService
  ) {}
  async ngOnInit(): Promise<void> {
    this.data = this.panelService.data as ClassroomFormData;
    this.isEditing = !!this.data.classroom;
    this.initializeForm();

    await this.fetchClassroomSchedules();
    await this.fetchCourseOptions();
    await this.fetchProgramOptions();
  }

  private fetchClassroomSchedules() {
    if (!this.data?.classroom) return;

    this.classroomService
      .getSchedules(this.data.classroom.id)
      .subscribe(schedules => {
        schedules.forEach(schedule => {
          schedule.startTime = transformDateTimeToTimePickerString(
            schedule.startTime
          );
          this.addSchedule(schedule);
        });
      });
  }

  private initializeForm(): void {
    this.classroomForm = this.formBuilder.group({
      course: [
        this.data ? this.data.classroom?.courseObject?.id?.toString() : '',
        [Validators.required],
      ],
      program: [
        this.data ? this.data.classroom?.programObject?.id.toString() : '',
        [Validators.required],
      ],

      startingDate: [
        this.data ? this.data.classroom?.starts : '',
        [Validators.required],
      ],
      schedules: new FormArray<ScheduleForm>([]),
    });
  }

  get schedules(): FormArray {
    return this.classroomForm.get('schedules') as FormArray<ScheduleForm>;
  }

  addSchedule(schedule: Schedule | null = null) {
    const scheduleGroup: ScheduleForm = this.formBuilder.group({
      id: [schedule?.id ? schedule.id.toString() : ''],
      weekday: [
        schedule ? schedule.weekdayId.toString() : '',
        [Validators.required],
      ],
      startingTime: [schedule ? schedule.startTime : '', [Validators.required]],
    });

    this.schedules.push(scheduleGroup);
  }

  get scheduleControls(): FormGroup[] {
    return this.schedules.controls as FormGroup[];
  }

  fetchCourseOptions() {
    this.courseService
      .getAll()
      .pipe(
        tap(courses => {
          this.courses = courses;
          this.updateDefaultDuration();
        }),
        map((courses): SelectOption[] =>
          courses.map(({ name, id }) => ({
            label: name,
            value: id!.toString(),
          }))
        )
      )
      .subscribe(options => {
        this.courseOptions = options;
      });
  }

  fetchProgramOptions() {
    this.programService
      .getAll()
      .pipe(
        map((programs): SelectOption[] =>
          programs.map(({ name, id }) => ({
            label: name,
            value: id.toString(),
          }))
        )
      )
      .subscribe(options => {
        this.programOptions = options;
      });
  }

  updateDefaultDuration() {
    const courseId: string = this.classroomForm.get('course')?.value;
    if (!courseId) return;

    const course = this.courses.find(
      course => course?.id?.toString() === courseId
    );

    if (!course?.duration) return;

    this.defaultDuration = course.duration.toString();
    this.duration = course.duration;
  }

  public getFieldError(field: string): string | null {
    const control = this.classroomForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }

  onSubmit() {
    const classroom = this.getClassroomFromForm();

    if (this.isEditing) {
      this.classroomService.edit(classroom).subscribe(this.requestHandler);
    } else {
      this.classroomService.create(classroom).subscribe(e => {
        const meeting = this.buildMeetingFromForm(e, classroom);
        this.meetingService.createmultiple(meeting);
      });
      this.panelService.close();
    }
  }

  getClassroomFromForm(): Classroom {
    const classroom: Classroom = {
      id: this.data?.classroom?.id || -1,
      courseObject: {
        id: this.classroomForm.get('course')?.value,
        name: '',
        description: '',
      },
      programObject: {
        id: this.classroomForm.get('program')?.value,
        name: '',
      },
      starts: this.classroomForm.get('startingDate')?.value,
    };
    const schedule: Schedule[] = this.scheduleControls.map(group => {
      return {
        id: group.get('id')?.value || 0,
        weekdayId: group.get('weekday')?.value,
        startTime: transform12TimeTo24Time(group.get('startingTime')?.value),
      };
    });

    classroom.schedule = schedule;

    return classroom;
  }

  buildMeetingFromForm(data: any, classroom: Classroom) {
    const meeting: CreateMultipleMeeting = {
      startdate: data.startDate,
      quantity: this.duration,
      classroomId: data.id,
      schedules: classroom.schedule,
    };

    const schedule: Schedule[] = this.scheduleControls.map(group => {
      return {
        id: group.get('id')?.value || 0,
        weekdayId: group.get('weekday')?.value,
        startTime: transform12TimeTo24Time(group.get('startingTime')?.value),
      };
    });

    meeting.schedules = schedule;
    return meeting;
  }

  get requestHandler() {
    return {
      next: (classroom: Classroom) => {
        this.panelService.close();
        if (this.data?.onSuccess) {
          this.data?.onSuccess(classroom);
        }
      },
      error: (error: Error) => {
        if (this.data?.onError) {
          this.data?.onError(error);
        }
      },
    };
  }

  openAddUsersForm() {
    this.panelService.openFromComponent(UpdateUsersFormComponent);
  }
}
