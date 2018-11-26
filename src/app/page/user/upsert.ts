import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {of, Subscription} from 'rxjs';
import {AppService, IRole, IUser} from '../../service/app';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../service/ui';



@Component({
  selector: 'app-user-upsert-page-component',
  template: `
    <h2 *ngIf="id === 'new'">Create User</h2>
    <h2 *ngIf="id !== 'new'">Update User</h2>
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
      flex-direction: column;
      width: calc(100% - 46px);
      height: calc(100% - 128px);
    }

    form {
      width: 100%;
    }
  `]
})
export class UserUpsertPageComponent implements OnInit, OnDestroy {
  initialUser: IUser;
  roles: IRole[];
  id: string;
  isProcessing = false;
  private sub: Subscription;
  private form = new FormGroup({});
  private model: Partial<IUser> = {
    name: '',
    email: '',
    roleIds: []
  };
  private fields: FormlyFieldConfig[] = [
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

  constructor(
    private appService: AppService,
    private uiService: UiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  submit(model) {
    const updatedUser = _.assignIn(
      _.clone(this.initialUser),
      _.pick(this.model, ['name', 'email']),
      {
        roleIds: _(model['role'])
          .pickBy((v, k) => !!v)
          .keys()
          .value()
      }
    );
    this.appService.updateUserItemHttp(updatedUser)
      .subscribe((user) => {
        if (this.id === 'new') {
          this.uiService.showMessage('The user has been created successfully.');
        } else {
          this.uiService.showMessage('The user has been updated successfully.');
        }
        this.router.navigate(['/user', 'index']);
      });
  }

  ngOnInit(): void {
    this.sub = this.appService.getRoleIndexHttp()
      .pipe(
        flatMap((roles) => {
          this.roles = roles;
          return this.activatedRoute.params;
        }),
        flatMap((params) => {
          this.id = params.id;

          if (this.id === 'new') {
            return of({
              name: '',
              email: '',
              roleIds: []
            } as IUser);
          }
          if (!!this.id) {
            return this.appService.getUserItemHttp(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((user) => {
        // Assigns roles objects according to the roleIds field.
        this.initialUser = user;
        this.model = _.pick(this.initialUser, ['name', 'description']);
        this.model['role'] = _.chain(user.roleIds)
          .map((id) => [id, true])
          .keyBy(0)
          .mapValues((a) => a[1])
          .value();

        // Generates role form fields.
        const roleFields = this.roles.map((role) => {
          return {
            key: role.id,
            type: 'checkbox',
            templateOptions: {
              label: role.name
            },
          };
        });
        const roleGroup = {
          key: 'role',
          wrappers: ['form-field'],
          templateOptions: { label: 'Role' },
          fieldGroup: roleFields
        };
        this.fields.push(roleGroup);
        this.model = _.clone(this.model);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
