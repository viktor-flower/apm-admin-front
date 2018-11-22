import {Injectable} from '@angular/core';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  constructor(
  ) {}

  public getStudents() {
    return of([]);
  }
}
