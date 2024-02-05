import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface SnackbarConfig {
  CLOSE_BUTTON_TEXT: string;
  CONFIG: MatSnackBarConfig;
}

export const SNACKBAR_ERROR_DEFAULTS: SnackbarConfig = {
  CLOSE_BUTTON_TEXT: 'Close',
  CONFIG: {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: ['error-snackbar'],
    duration: 3000,
  },
};

export const SNACKBAR_SUCCESS_DEFAULTS: SnackbarConfig = {
  CLOSE_BUTTON_TEXT: 'Close',
  CONFIG: {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar'],
    duration: 2000,
  },
};
