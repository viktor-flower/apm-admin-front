import {noop, ID} from '@datorama/akita';
import {StudentStore} from '../state/student.store';
import {StudentQuery} from '../state/student.query';
import {Observable} from 'rxjs';
import {Student} from '../state/student.model';
import {StudentDataService} from './student-data';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(
    private studentDataService: StudentDataService,
    private studentStore: StudentStore,
    private studentQuery: StudentQuery
  ) {}

  getStudents(): Observable<Student[]> {
    const request = this.studentDataService.getStudents().pipe(
      tap(s => this.studentStore.set(s))
    );

    return this.studentQuery.isPristine ? request : noop();
  }

  deleteStudent(id: ID) {
    this.studentStore.remove(id);
  }

  updateStudent(student: Student) {
    this.studentStore.createOrReplace(student.id, {...student});
  }

}
