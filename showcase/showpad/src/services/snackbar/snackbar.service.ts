import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public constructor(private readonly snackbar: MatSnackBar) {}

  public open(message: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackbar.open(message, action);
  }
}
