import {QueryEntity} from '@datorama/akita';
import {StudentState} from './student.store';
import {Student} from './student.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';


export interface IStudentGraphData { [key: string]: Array<string | number>; }

// =
export class StudentQuery extends QueryEntity<StudentState, Student> {

  studentGraphData$ = this.selectAll().pipe(
    map(this.getStudentGraphData.bind(this))
  );

  getStudentGraphData(students: Student[]): IStudentGraphData {
    return students.reduce<IStudentGraphData>(
      (
        {names: _names, quarterly: _quarterly, halfyearly: _halfyearly, annual: _annual}: IStudentGraphData,
        {name, quarterlyScore, halfyearlyScore, annualScore}: Student): IStudentGraphData => {
        return {
          names: [..._names, name],
          quaterly: [..._quarterly, quarterlyScore],
          halfyearly: [..._halfyearly, halfyearlyScore],
          annual: [..._annual, annualScore],
        };
      },
      {names: [], quarterly: [], halfyearly: [], annual: []}
    );
  }

}