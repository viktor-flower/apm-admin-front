import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {StudentService} from '../../service/student';
import {Observable} from 'rxjs';
import {createStudent, Student} from '../../state/student.model';
import {StudentQuery} from '../../state/student.query';
import {ID} from '@datorama/akita';

@Component({
  selector: 'app-user-upsert-page-component',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <button mat-raised-button color="primary" type="submit" class="btn btn-default">Submit</button>
      </formly-form>
    </form>
  `,
  styles: [`
    :host {
      background: red;
      padding: 23px;
      display: flex;
      width: 100%;
      height: calc(100% - 64px);
    }
  `]
})
export class UserUpsertPageComponent implements OnInit {
  formData: Student;
  students$: Observable<Student[]>;

  constructor(
    //private studentService: StudentService,
    private studentQuery: StudentQuery
  ) {}

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        placeholder: 'Name',
        required: true,
      }
    }
  ];

  submit(model) {
    console.log(model);
  }

  ngOnInit(): void {
    //this.studentService.getStudents().subscribe();
    //this.students$ = this.studentQuery.selectAll();
  }

  onAdd() {
    this.formData = createStudent({});
  }

  onEdit(id: ID) {
    this.formData = this.studentQuery.getEntity(id);
  }

  onDelete(id: ID) {
    this.studentService.deleteStudent(id);
  }

  updateFormData(student: Student) {
    this.studentService.updateStudent(student);
  }

}
