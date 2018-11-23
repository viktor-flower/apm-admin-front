import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {StudentService} from '../../service/student';
import {Observable, Subscriber} from 'rxjs';
import {createStudent, Student} from '../../state/student.model';
import {StudentQuery} from '../../state/student.query';
import {ID} from '@datorama/akita';
import {AppService} from '../../service/app';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-upsert-page-component',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <div class="action-controls">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || isProcessing">Submit</button>
        </div>
      </formly-form>
    </form>
  `,
  styles: [`
    :host {
      margin: 23px;
      display: flex;
      width: calc(100% - 46px);
      height: calc(100% - 128px);
    }

    form {
      width: 100%;
    }
  `]
})
export class UserUpsertPageComponent implements OnInit, OnDestroy {
  isProcessing = false;
  formData: Student;
  students$: Observable<Student[]>;
  private sub: Subscriber;


  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute
    // private studentService: StudentService,
    // private studentQuery: StudentQuery
  ) {}

  form = new FormGroup({});
  model = { email: '' };
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
    this.sub = this.activatedRoute.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    //this.studentService.getStudents().subscribe();
    // this.students$ = this.studentQuery.selectAll();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAdd() {
    this.formData = createStudent({});
  }

  onEdit(id: ID) {
    // this.formData = this.studentQuery.getEntity(id);
  }

  onDelete(id: ID) {
    // this.studentService.deleteStudent(id);
  }

  updateFormData(student: Student) {
    // this.studentService.updateStudent(student);
  }

}
