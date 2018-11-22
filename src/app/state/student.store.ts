import {EntityState, StoreConfig, EntityStore} from '@datorama/akita';
import {Student} from './student.model';
import {Injectable} from '@angular/core';

export interface StudentState extends  EntityState<Student> {}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'students'
})
export class StudentStore extends EntityStore<StudentState, Student> {
  constructor() {
    super();
  }
}
