import { Component } from '@angular/core';
import { Course } from 'src/app/shared/models/Courses';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent {
  headers = ['id', 'name', 'description'];
  data: Course[] | Course | null | any = [];

  constructor(public courseService: CourseService) {
    this.fetchData();
  }

  fetchData() {
    try {
      this.courseService.getAll().subscribe(
        (data: Course[] | Course | null) => {
          this.data = data;
        },
        error => {
          console.log(
            'Something went wrong while trying to retrieve data from API',
            error
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
