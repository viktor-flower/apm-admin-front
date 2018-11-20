import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UiService {
  constructor(
    private snackBar: MatSnackBar
  ) {}

  public showMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
