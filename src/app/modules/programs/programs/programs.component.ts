import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Program } from 'src/app/shared/models/Programs';
import { ProgramService } from 'src/app/shared/services/program.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass'],
})
export class ProgramsComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;
  isSidenavOpen = true;


  programa1 : Program = {
    id: 1,
    name: 'Bootcamp Dev 2024',
    description: 'Bootcamp summer 2024'
  };
  programa2 : Program = {
    id: 2,
    name: 'Bootcamp Full-stack 2025',
    description: 'Un bootcamp full stack de la cia.'
  };
  programa3 : Program = {
    id: 3,
    name: 'Winter bootcamp 2024',
    description: 'Winter Bootcamp a efectuarse el 2024 con tecnologioas'
  };

  headers = ['id', 'name', 'description'];
  data = [
    this.programa1,
    this.programa2,
    this.programa3
  ];

  programs: Program[] | Program | null = [];

  constructor(public programService : ProgramService) {
    this.fetchData();
   }

   fetchData(){
      this.programService.getPrograms().subscribe((data : Program[] | Program | null) => {
        this.programs = data;
      }
    );
   }

}
