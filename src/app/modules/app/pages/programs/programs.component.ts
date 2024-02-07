import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import { SNACKBAR_ERROR_DEFAULTS } from 'src/app/shared/constants/snackbar.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { Program } from 'src/app/shared/models/Programs';
import { ProgramService } from 'src/app/shared/services/program.service';
import { programHeaders } from './programs.constants';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass'],
})
export class ProgramsComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;
  isSidenavOpen = true;
  isLoading = true;

  headers = programHeaders;
  programList: Program[] | Program | null | any = [];

  constructor(
    public programService: ProgramService,
    private snackBar: MatSnackBar,
    private readonly dialogService: DialogService
  ) {
    this.fetchPrograms();
  }

  fetchPrograms() {
    this.isLoading = true;
    this.programService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }
  private handleSuccess(programs: Program[]): void {
    this.programList = programs;
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

  showDeleteDialog(program: Program) {
    this.dialogService
      .showDeleteConfirmation(DeleteConfirmationComponent<Program>, {
        item: program,
        identifier: 'name',
      })
      .subscribe(confirmed => {
        if (!confirmed) return;

        this.deleteProgram(program);
      });
  }

  private deleteProgram(program: Program) {
    this.programService.delete(program).subscribe({
      next: () => {
        this.displaySnackbar(`${program.name} deleted sucessfully`);
        this.fetchPrograms();
      },
      error: error => {
        this.dialogService.showErrorMessage(ErrorMessageComponent, error.error);
      },
    });
  }
}
