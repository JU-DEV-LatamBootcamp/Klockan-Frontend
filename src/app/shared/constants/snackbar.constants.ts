import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SNACKBAR_ERROR_DEFAULTS: {
  CLOSE_BUTTON_TEXT: string;
  CONFIG: MatSnackBarConfig;
} = {
  CLOSE_BUTTON_TEXT: 'Close',
  CONFIG: {
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: ['error-snackbar'],
  },
};
