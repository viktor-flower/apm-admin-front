import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {AppService} from '../../service/app';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../service/ui';

@Component({
  selector: 'app-user-set-password-page-component',
  template: `
    <h2>Set password</h2>
    <form [formGroup]="form" (ngSubmit)="submit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model">
        <div class="action-controls">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="submit"
            [disabled]="form.invalid || isProcessing">
            Submit
          </button>
        </div>
      </formly-form>
    </form>
  `,
  styles: [`
    :host {
      margin: 23px;
      display: flex;
      flex-direction: column;
      width: calc(100% - 46px);
      height: calc(100% - 128px);
    }

    form {
      width: 100%;
    }
  `]
})
export class UserSetPasswordPageComponent implements OnInit, OnDestroy {
  public isProcessing = false;
  public form = new FormGroup({});
  public model = {
    password: {
      password: '',
      passwordConfirm: ''
    }
  };
  public fields: FormlyFieldConfig[] = [{
    key: 'password',
    validators: {
      fieldMatch: {
        expression: (control) => {
          const value = control.value;

          return value.passwordConfirm === value.password
            // avoid displaying the message error when values are empty
            || (!value.passwordConfirm || !value.password);
        },
        message: 'Password Not Matching',
        errorPath: 'passwordConfirm',
      },
    },
    fieldGroup: [
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          placeholder: 'Must be at least 3 characters',
          required: true,
          minLength: 3,
        },
      },
      {
        key: 'passwordConfirm',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          placeholder: 'Please re-enter your password',
          required: true,
        },
      },
    ],
  }];
  private sub: Subscription;
  private _id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params
      .subscribe((params) => {
        this._id = params._id;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit(model, done = () => {}) {
    this.appService.setPasswordHttp(this._id, this.model.password.password)
      .subscribe((success) => {
        if (success) {
          this.router.navigate(['/user', 'index']);
          this.uiService.showMessage('The password has been reseted successfully!');
        } else {
          this.uiService.showMessage('Some error is occured.');
        }
        done();
      });
  }

}
