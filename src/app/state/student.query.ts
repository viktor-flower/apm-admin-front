import {QueryEntity} from '@datorama/akita';
import {StudentState} from './student.store';
import {Student} from './student.model';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';


export interface IStudentGraphData { [key: string]: Array<string | number>; }

@Injectable({
  providedIn: 'root'
})
export class StudentQuery extends QueryEntity<StudentState, Student> {

  studentGraphData$ = this.selectAll().pipe(
    map(this.getStudentGraphData.bind(this))
  );

  getStudentGraphData(students: Student[]): IStudentGraphData {
    return students.reduce<IStudentGraphData>(
      (
        {names: _names, quarterly: _quarterly, halfyearly: _halfyearly, annual: _annual}: IStudentGraphData,
        {name, quarterly, halfyearly, annual}: Student): IStudentGraphData => {
        return {
          names: [..._names, name],
          quaterly: [..._quarterly, quarterly],
          halfyearly: [..._halfyearly, halfyearly],
          annual: [..._annual, annual],
        };
      },
      {names: [], quarterly: [], halfyearly: [], annual: []}
    );
  }

}