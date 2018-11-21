import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

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
export class UserUpsertPageComponent {
  constructor() {

  }

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
}
