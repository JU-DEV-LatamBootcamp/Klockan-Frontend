import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
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
  isLoading = true;

  headers = ['id', 'name', 'description'];
  data: Program[] | Program | null | any = [];

  constructor(public programService: ProgramService, private snackBar: MatSnackBar) {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.programService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }
  private handleSuccess(data: Program[]): void {
    this.data = data;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
    this.displaySnackbar(API_ERROR_MESSAGE);
  }

  private displaySnackbar(message: string): void {
    this.snackBar.open(
      message,
      SNACKBAR_ERROR_DEFAULTS.CLOSE_BUTTON_TEXT,
      SNACKBAR_ERROR_DEFAULTS.CONFIG
    );
  }
}
