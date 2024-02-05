import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';

import { Course, CourseToService } from 'src/app/shared/models/Courses';
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
export class CourseFormComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  course$!: Observable<Course | CourseToService>;
  courseSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public courseService: CourseService,
    private dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
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

  onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.data) {
        this.editCourse(this.courseForm.value);
      } else {
        this.createCourse(this.courseForm.value);
      }
    }
  }

  private createCourse(courseData: Course): void {
    const newCourse = {
      name: courseData.name,
      sessions: courseData.sessions,
      duration: courseData.duration,
      description: courseData.description,
    };

    this.course$ = this.courseService.add(newCourse);
    this.courseSubscription = this.course$.subscribe({
      next: course => {
        this.dialogRef.close(course);
      },
      error: error => {
        console.error('Error creating course: ', error);
      },
    });
  }

  private editCourse(courseData: Course): void {
    this.course$ = this.courseService.edit(courseData);
    this.courseSubscription = this.course$.subscribe({
      next: course => {
        this.dialogRef.close(course);
      },
      error: error => {
        console.error('Error updating course', error);
      },
    });
  }
}
