import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { API_ERROR_MESSAGE } from 'src/app/shared/constants/api.constants';
import {
  SNACKBAR_ERROR_DEFAULTS,
  SNACKBAR_SUCCESS_DEFAULTS,
  SnackbarConfig,
} from 'src/app/shared/constants/snackbar.constants';
import { Program } from 'src/app/shared/models/Programs';
import { ProgramService } from 'src/app/shared/services/program.service';
import { programCommonColumns, programTypeColumns } from './programs.constants';
import { DialogService } from 'src/app/shared/layouts/app-layout/services/dialog/dialog.service';
import { ProgramFormComponent } from './components/program-form/program-form.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.sass'],
})
export class ProgramsComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav | undefined;
  public isSidenavOpen = true;
  public isLoading = true;

  columns = programTypeColumns;
  commonColumns = programCommonColumns;
  programs: Program[] = [];

  constructor(
    public readonly programService: ProgramService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogService: DialogService
  ) {
    this.fetchPrograms();
  }

  public fetchPrograms() {
    this.isLoading = true;
    this.programService.getAll().subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }
  private handleSuccess(programs: Program[]): void {
    this.programs = programs;
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.error(API_ERROR_MESSAGE, error);
    this.isLoading = false;
    this.displaySnackbar(API_ERROR_MESSAGE, SNACKBAR_ERROR_DEFAULTS);
  }

  private displaySnackbar(message: string, customConfig: SnackbarConfig): void {
    this.snackBar.open(
      message,
      customConfig.CLOSE_BUTTON_TEXT,
      customConfig.CONFIG
    );
  }

  public showDeleteDialog(program: Program) {
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
        this.displaySnackbar(
          `Program ${program.name} deleted.`,
          SNACKBAR_ERROR_DEFAULTS
        );
        this.fetchPrograms();
      },
      error: error => {
        this.dialogService.showErrorMessage(ErrorMessageComponent, error.error);
      },
    });
  }

  public showEditDialog(item: Program): void {
    this.dialogService
      .show(ProgramFormComponent, {
        item: item,
        service: this.programService,
      })
      .subscribe(res => {
        if (res) {
          this.fetchPrograms();
          this.displaySnackbar(
            `Program ${res.name} edited.`,
            SNACKBAR_SUCCESS_DEFAULTS
          );
        }
      });
  }

  public showCreateDialog(): void {
    this.dialogService.show(ProgramFormComponent).subscribe(result => {
      if (result) this.createProgram(result);
    });
  }

  private createProgram({ name }: Program): void {
    this.displaySnackbar(`Program ${name} created.`, SNACKBAR_SUCCESS_DEFAULTS);
    this.fetchPrograms();
  }
}
