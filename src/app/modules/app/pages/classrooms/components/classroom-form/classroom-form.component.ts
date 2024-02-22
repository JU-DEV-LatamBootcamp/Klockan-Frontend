import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { map, tap } from 'rxjs';
import { weekdayOptions } from 'src/app/shared/constants/weekday-options';
import { SelectOption } from 'src/app/shared/interfaces/select-options';
import { Classroom } from 'src/app/shared/models/Classroom';
import { Course } from 'src/app/shared/models/Courses';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { transform24TimeTo12Time } from 'src/app/shared/utils/date-mapper';

export type ScheduleForm = FormGroup<{
  weekday: FormControl<string | null>;
  startingTime: FormControl<string | null>;
}>;

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
  title!: string;
  classroomForm!: FormGroup;
  programOptions: SelectOption[] = [];
  courseOptions: SelectOption[] = [];
  courses: Course[] = [];
  weekdayOptions = weekdayOptions;
  defaultDuration?: string;

  constructor(
    public readonly classroomService: ClassroomService,
    public readonly programService: ProgramService,
    public readonly courseService: CourseService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ClassroomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Classroom }
  ) {}

  private initializeForm(): void {
    this.classroomForm = this.formBuilder.group({
      course: [
        this.data ? this.data.item.courseObject?.id?.toString() : '',
        [Validators.required],
      ],
      program: [
        this.data ? this.data.item.programObject?.id.toString() : '',
        [Validators.required],
      ],
      startingDate: [
        this.data ? this.data.item.starts : '',
        [Validators.required],
      ],
      schedules: new FormArray<ScheduleForm>([]),
    });
  }

  get schedules(): FormArray {
    return this.classroomForm.get('schedules') as FormArray<ScheduleForm>;
  }

  addSchedule() {
    const schedule: ScheduleForm = this.formBuilder.group({
      weekday: ['', [Validators.required]],
      startingTime: ['', [Validators.required]],
    });

    this.schedules.push(schedule);
  }

  get scheduleControls(): FormGroup[] {
    return this.schedules.controls as FormGroup[];
  }

  async ngOnInit(): Promise<void> {
    // IMPROVEMENT: this data should be managed in a stream serivce of courses and programs
    this.title = this.data ? 'Edit Classroom' : 'Create Classroom';
    this.initializeForm();

    await this.fetchCourseOptions();
    await this.fetchProgramOptions();
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
    const classroom = this.buildClassroomFromForm();

    if (this.data) {
      this.classroomService.edit(classroom).subscribe(this.requestHandler);
      return;
    }

    this.classroomService.create(classroom).subscribe(this.requestHandler);
  }

  buildClassroomFromForm() {
    const classroom: Classroom = {
      id: this.data?.item?.id || -1,
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

    const schedule = this.scheduleControls.map(group => {
      return {
        weekdayId: group.get('weekday')?.value,
        startTime: transform24TimeTo12Time(group.get('startingTime')?.value),
      };
    });

    classroom.schedule = schedule;

    return classroom;
  }

  get requestHandler() {
    return {
      next: (classroom: Classroom) => {
        this.dialogRef.close(classroom);
      },
      error: (error: Error) => {
        console.error(
          `Error ${this.data ? 'editing' : 'creating'} classroom:`,
          error
        );
      },
    };
  }
}
