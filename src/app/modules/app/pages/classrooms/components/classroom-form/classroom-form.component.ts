import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Observable, map } from 'rxjs';
import { SelectOption } from 'src/app/shared/interfaces/select-options';
import { Classroom } from 'src/app/shared/models/Classroom';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ProgramService } from 'src/app/shared/services/program.service';

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
  headerTypeLabel = 'Create Classroom';
  classroomForm!: FormGroup;
  programOptions: SelectOption[] = [];
  courseOptions: SelectOption[] = [];

  constructor(
    public readonly classroomService: ClassroomService,
    public readonly programService: ProgramService,
    public readonly courseService: CourseService,
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { item: Classroom }
  ) {}

  private initializeForm(): void {
    this.classroomForm = this.formBuilder.group({
      name: [
        this.data ? this.data.item.id : '',
        [Validators.required, Validators.maxLength(200)],
      ],
      description: [this.data ? this.data.item.program : ''],
    });
  }

  ngOnInit(): void {
    // IMPROVEMENT: this data should be managed in a stream serivce of courses and programs
    this.fetchCourseOptions();
    this.fetchProgramOptions();

    this.initializeForm();
  }

  fetchCourseOptions() {
    this.courseService
      .getAll()
      .pipe(
        map((courses): SelectOption[] =>
          courses.map(course => ({
            label: course.name,
            value: course.id!.toString(),
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
          programs.map(program => ({
            label: program.name,
            value: program.id.toString(),
          }))
        )
      )
      .subscribe(options => {
        this.programOptions = options;
      });
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

  onSubmit() {}
}
