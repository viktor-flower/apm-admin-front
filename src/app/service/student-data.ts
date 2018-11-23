import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import * as _ from 'lodash';
import * as faker from 'faker';
import {Student} from '../state/student.model';
import {ID, guid} from '@datorama/akita';


// @Injectable({
//   providedIn: 'root'
// })
export class StudentDataService {
  constructor() {
  }

  public getStudents() {
    const students: Student[] = _.range(10).map(() => {
      const gender = faker.random.arrayElement(['female', 'male']);
      return {
        id: guid(),
        name: faker.name.findName(gender),
        standard: faker.random.number(10),
        sex: gender,
        quarterlyScore: faker.random.number(100),
        halfyearlyScore: faker.random.number(100),
        annualScore: faker.random.number(100)
      } as Student;
    });

    console.log(students);

    //return of(students);
    return of([]);
  }
}
