import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly courseService: CourseService,
    private readonly dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.courseForm = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data ? this.data.name : '', Validators.required],
      sessions: [this.data ? this.data.sessions : '', Validators.required],
      duration: [this.data ? this.data.duration : '', Validators.required],
      description: [this.data ? this.data.description : ''],
    });
  }

  public getFieldError(field: string): string | null {
    const control = this.courseForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }

  public onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.data) {
        this.editCourse();
      } else {
        this.createCourse();
      }
    } else this.courseForm.markAllAsTouched();
  }

  private createCourse(): void {
    this.courseService.create(this.courseForm.value).subscribe({
      next: course => {
        this.dialogRef.close(course);
      },
      error: error => {
        console.error('Error creating course ', error);
      },
    });
  }

  private editCourse(): void {
    this.courseService.edit(this.courseForm.value).subscribe({
      next: course => {
        this.dialogRef.close(course);
      },
      error: error => {
        console.error('Error updating course ', error);
      },
    });
  }
}
