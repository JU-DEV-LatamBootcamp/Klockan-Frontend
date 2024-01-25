import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Program } from 'src/app/shared/models/Programs';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass']
})
export class ProgramsComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;
  isSidenavOpen = true;

  headers = ['id', 'name', 'description'];
  data: Program[] | Program | null | any = [];

  constructor(public programService: ProgramService) {
    this.fetchData();
  }

  fetchData() {
    try {
      this.programService.getPrograms().subscribe(
        (data: Program[] | Program | null) => {
          console.log(data);
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
