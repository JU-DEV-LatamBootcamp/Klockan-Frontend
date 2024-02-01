import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';

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
export class CourseFormComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  course$!: Observable<Course>;
  courseSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public courseService: CourseService,
    private dialogRef: MatDialogRef<CourseFormComponent>
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
      name: ['', Validators.required],
      sessions: ['', Validators.required],
      duration: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit(): void {
    console.log('form is valid: ', this.courseForm.valid);
    console.log(this.courseForm.value);
    if (this.courseForm.valid) {
      this.createCourse(this.courseForm.value);
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
}
