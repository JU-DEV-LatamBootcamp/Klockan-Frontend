import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { map } from 'rxjs';
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
  title!: string;
  classroomForm!: FormGroup;
  programOptions: SelectOption[] = [];
  courseOptions: SelectOption[] = [];

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
      startingDate: [this.data ? this.data.item.starts : ''],
    });
  }

  ngOnInit(): void {
    // IMPROVEMENT: this data should be managed in a stream serivce of courses and programs
    this.fetchCourseOptions();
    this.fetchProgramOptions();

    this.title = this.data ? 'Edit Classroom' : 'Create Classroom';
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

  onSubmit() {
    const classroom = this.buildClassroomFromForm();

    if (this.data) {
      this.editClassroom(classroom);
      return;
    }

    this.createClassroom(classroom);
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

    return classroom;
  }

  createClassroom(classroom: Classroom) {
    this.classroomService.create(classroom).subscribe({
      next: classroom => {
        this.dialogRef.close(classroom);
      },
      error: error => {
        console.error('Error creating classroom:', error);
      },
    });
  }

  editClassroom(classroom: Classroom) {
    this.classroomService.edit(classroom).subscribe({
      next: classroom => {
        this.dialogRef.close(classroom);
      },
      error: error => {
        console.error('Error editing classroom:', error);
      },
    });
  }
}
